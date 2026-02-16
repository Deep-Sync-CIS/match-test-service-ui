#!/bin/bash

# Deploy match-test-service-ui to S3 prefix and invalidate CloudFront

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
STACK_NAME="${STACK_NAME:-deepsync-core-ui-dev}"
REGION="${AWS_REGION:-us-east-1}"
BUILD_DIR="dist"
APP_PREFIX="${APP_PREFIX:-match-test-service}"
SKIP_BUILD="${SKIP_BUILD:-0}"

if [ "$SKIP_BUILD" != "1" ]; then
    echo -e "${GREEN}🏗️  Building application...${NC}"
    echo ""

    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📦 Installing dependencies...${NC}"
        npm install
    fi

    echo -e "${BLUE}Running: npm run build${NC}"
    npm run build

    if [ ! -d "$BUILD_DIR" ]; then
        echo -e "${RED}❌ Build failed! dist/ directory not found.${NC}"
        exit 1
    fi

    echo ""
    echo -e "${GREEN}✅ Build completed successfully!${NC}"
    echo ""
else
    echo -e "${YELLOW}⏭️  SKIP_BUILD=1 set. Using existing ${BUILD_DIR}/ output.${NC}"
    if [ ! -d "$BUILD_DIR" ]; then
        echo -e "${RED}❌ ${BUILD_DIR}/ not found. Build the app before deploying.${NC}"
        exit 1
    fi
    echo ""
fi

# Resolve bucket and distribution
if [ -z "${BUCKET_NAME:-}" ]; then
    echo -e "${YELLOW}📡 Fetching stack information...${NC}"
    BUCKET_NAME=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --query 'Stacks[0].Outputs[?OutputKey==`MatchTestServiceBucketName`].OutputValue' \
        --output text)
fi

if [ -z "${DISTRIBUTION_ID:-}" ]; then
    DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
        --output text)
fi

if [ -z "$BUCKET_NAME" ] || [ "$BUCKET_NAME" == "None" ]; then
    echo -e "${RED}❌ Could not find S3 bucket. Is the CloudFormation stack deployed?${NC}"
    echo "   Run: ./scripts/deploy-infrastructure-multiapp.sh (core UI repo)"
    exit 1
fi

if [ -z "$DISTRIBUTION_ID" ] || [ "$DISTRIBUTION_ID" == "None" ]; then
    echo -e "${RED}❌ Could not find CloudFront distribution. Is the CloudFormation stack deployed?${NC}"
    echo "   Run: ./scripts/deploy-infrastructure-multiapp.sh (core UI repo)"
    exit 1
fi

echo -e "${GREEN}✅ Found resources:${NC}"
echo "   Bucket: $BUCKET_NAME"
echo "   Distribution: $DISTRIBUTION_ID"
echo "   Prefix: $APP_PREFIX"
echo ""

# Upload to S3
DEST_PREFIX="s3://$BUCKET_NAME/"

echo -e "${BLUE}📤 Uploading build to S3: ${DEST_PREFIX}${NC}"
aws s3 sync \
    "$BUILD_DIR/" \
    "$DEST_PREFIX" \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html" \
    --exclude "assets/remoteEntry.js" \
    --exclude "service-worker.js" \
    --region "$REGION"

aws s3 sync \
    "$BUILD_DIR/" \
    "$DEST_PREFIX" \
    --delete \
    --cache-control "no-cache, no-store, must-revalidate" \
    --exclude "*" \
    --include "*.html" \
    --include "assets/remoteEntry.js" \
    --include "service-worker.js" \
    --region "$REGION"

echo ""
echo -e "${GREEN}✅ Files uploaded successfully!${NC}"
echo ""

# Invalidate CloudFront cache for the app shell
echo -e "${YELLOW}🔄 Invalidating CloudFront cache...${NC}"
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/$APP_PREFIX" "/$APP_PREFIX/index.html" "/$APP_PREFIX/assets/remoteEntry.js" \
    --query 'Invalidation.Id' \
    --output text \
    --region "$REGION")

echo -e "${GREEN}✅ Cache invalidation created: $INVALIDATION_ID${NC}"

# Show website URL if available
WEBSITE_URL=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query 'Stacks[0].Outputs[?OutputKey==`WebsiteURL`].OutputValue' \
    --output text 2>/dev/null || true)

if [ -n "$WEBSITE_URL" ] && [ "$WEBSITE_URL" != "None" ]; then
    echo ""
    echo -e "${GREEN}🌐 App URL:${NC}"
    echo "   $WEBSITE_URL/$APP_PREFIX"
fi
