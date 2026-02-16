import { Job, Connection, KpiCardData } from '../types'

// Static data - will be replaced with API calls later
export const mockJobs: Job[] = [
  {
    id: 1,
    fileName: 'enterprise_leads_jan2026.csv',
    matchType: 'PII',
    processedDate: '2026-01-09T14:35:22',
    matchRate: 'Processing',
    status: 'processing',
    exported: false,
    fileSize: '220 MB',
    recordCount: 2345000,
  },
  {
    id: 2,
    fileName: 'customer_data_q4_2025.csv',
    matchType: 'PII',
    processedDate: '2026-01-05T09:12:45',
    matchRate: '95%',
    status: 'completed',
    exported: true,
    fileSize: '145 MB',
    recordCount: 1500000,
  },
  {
    id: 3,
    fileName: 'retail_customers_2025.xlsx',
    matchType: 'Transaction',
    processedDate: '2025-12-28T16:48:11',
    matchRate: '88%',
    status: 'completed',
    exported: false,
    fileSize: '87 MB',
    recordCount: 892000,
  },
  {
    id: 4,
    fileName: 'loyalty_members.csv',
    matchType: 'Digital',
    processedDate: '2025-12-15T11:22:33',
    matchRate: '92%',
    status: 'completed',
    exported: true,
    fileSize: '52 MB',
    recordCount: 456000,
  },
  {
    id: 5,
    fileName: 'b2b_prospects_q4.xlsx',
    matchType: 'PII',
    processedDate: '2025-12-08T08:45:19',
    matchRate: '89%',
    status: 'completed',
    exported: true,
    fileSize: '71 MB',
    recordCount: 678000,
  },
  {
    id: 6,
    fileName: 'holiday_campaign_2024.parquet',
    matchType: 'Digital',
    processedDate: '2024-12-25T09:12:45',
    matchRate: '88.7%',
    status: 'completed',
    exported: true,
    fileSize: '62 MB',
    recordCount: 520000,
  },
]

export const mockKpiData = {
  totalJobsCompleted: 4,
  totalRecordsProcessed: 1250000,
  averageMatchRate: 90.4,
}

export const mockKpiCards: KpiCardData[] = [
  {
    value: '247',
    label: 'Total Jobs Completed',
    trendText: '+27 since last month',
    trendPercent: '12%',
    trendDirection: 'up',
    iconVariant: 'checkmark',
    trendColor: 'green',
  },
  {
    value: '45.2M',
    label: 'Total Records Processed',
    trendText: '+9.8M since last month',
    trendPercent: '28%',
    trendDirection: 'up',
    iconVariant: 'barChart',
    trendColor: 'purple',
  },
  {
    value: '91.8%',
    label: 'Average Match Rate',
    trendText: '+4.6pp improvement',
    trendPercent: '5.2%',
    trendDirection: 'up',
    iconVariant: 'target',
    trendColor: 'green',
  },
]

export const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Production Snowflake',
    type: 'snowflake',
    status: 'active',
    createdDate: 'Dec 14, 2024',
    details: {
      host: 'account.snowflakecomputing.com',
      database: 'CUSTOMER_DB',
    },
  },
  {
    id: '2',
    name: 'AWS S3 Archive',
    type: 's3',
    status: 'inactive',
    createdDate: 'Dec 9, 2024',
    details: {
      bucket: 'customer-data-archive',
      path: '/2024/q4/',
    },
  },
  {
    id: '3',
    name: 'Analytics Databricks',
    type: 'databricks',
    status: 'error',
    createdDate: 'Nov 27, 2024',
    details: {
      host: 'dbc-xxxxx.cloud.databricks.com',
      database: 'analytics',
    },
  },
]
