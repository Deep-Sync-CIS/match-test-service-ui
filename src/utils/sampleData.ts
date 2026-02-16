/**
 * Sample Data Generator for Full Report Preview
 * Generates mock data with 50 rows and 85 columns
 */

import { maskName, maskEmail, maskPhone, maskAddress, maskIPAddress, maskDeviceID } from './piiMasking'

export interface SampleDataRow {
  [key: string]: string | number
}

// Define all 85 columns
export const SAMPLE_DATA_COLUMNS = [
  // Identity & Contact (20 columns)
  'First Name',
  'Last Name',
  'Full Name',
  'Email Address',
  'Phone Number',
  'Mobile Phone',
  'Work Phone',
  'Street Address',
  'City',
  'State',
  'ZIP Code',
  'Country',
  'IP Address',
  'Device ID',
  'Cookie ID',
  'Social Security Number',
  'LinkedIn Profile',
  'Facebook Profile',
  'Twitter Handle',
  'Website URL',
  
  // Demographics (15 columns)
  'Age',
  'Gender',
  'Date of Birth',
  'Marital Status',
  'Number of Children',
  'Household Size',
  'Ethnicity',
  'Language',
  'Education Level',
  'School Name',
  'Graduation Year',
  'Political Affiliation',
  'Veteran Status',
  'Pet Owner',
  'Health Insurance',
  
  // Financial & Wealth (15 columns)
  'Income Range',
  'Annual Income',
  'Net Worth',
  'Credit Score',
  'Credit Card Type',
  'Bank Name',
  'Investment Account',
  'Insurance Policies',
  'Tax Filing Status',
  'Charitable Giving',
  'Payment Methods',
  'Subscription Services',
  'Shopping Habits',
  'Brand Preferences',
  'Loyalty Programs',
  
  // Home & Property (10 columns)
  'Home Owner Status',
  'Property Value',
  'Mortgage Amount',
  'Square Footage',
  'Number of Bedrooms',
  'Number of Bathrooms',
  'Year Built',
  'Home Condition',
  'Home Style',
  'Property Tax',
  
  // Professional (10 columns)
  'Job Title',
  'Company Name',
  'Industry',
  'Company Size',
  'Department',
  'Management Level',
  'Years of Experience',
  'Employment Status',
  'Salary Range',
  'Skills',
  
  // Lifestyle (8 columns)
  'Hobbies',
  'Interests',
  'Travel Frequency',
  'Dining Preferences',
  'Cuisine Preferences',
  'Entertainment Preferences',
  'Volunteer Work',
  'Religious Participation',
  
  // Technology (5 columns)
  'Device Ownership',
  'Smartphone Brand',
  'Operating System',
  'Browser',
  'Smart Home Devices',
  
  // Marketing (2 columns)
  'Purchase Intent',
  'Brand Affinity',
]

// Generate sample data
const generateSampleData = (): SampleDataRow[] => {
  const data: SampleDataRow[] = []
  
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Jessica', 'William', 'Ashley']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA']
  const genders = ['Male', 'Female', 'Other']
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed']
  const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 'Manufacturing', 'Real Estate', 'Consulting']
  const jobTitles = ['Software Engineer', 'Marketing Manager', 'Sales Representative', 'Product Manager', 'Data Analyst', 'Designer', 'Consultant', 'Director']
  
  for (let i = 0; i < 50; i++) {
    const firstName = firstNames[i % firstNames.length]
    const lastName = lastNames[i % lastNames.length]
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`
    const phone = `555-${String(1000 + i).slice(-4)}`
    const ip = `192.168.${Math.floor(i / 10)}.${i % 255}`
    const deviceId = `DEVICE${String(1000 + i).padStart(6, '0')}`
    
    data.push({
      'First Name': firstName,
      'Last Name': lastName,
      'Full Name': `${firstName} ${lastName}`,
      'Email Address': email,
      'Phone Number': phone,
      'Mobile Phone': phone,
      'Work Phone': `555-${String(2000 + i).slice(-4)}`,
      'Street Address': `${100 + i} Main Street`,
      'City': cities[i % cities.length],
      'State': states[i % states.length],
      'ZIP Code': `${10000 + i}`,
      'Country': 'United States',
      'IP Address': ip,
      'Device ID': deviceId,
      'Cookie ID': `COOKIE${i}`,
      'Social Security Number': `***-**-${String(1000 + i).slice(-4)}`,
      'LinkedIn Profile': `linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      'Facebook Profile': `facebook.com/${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      'Twitter Handle': `@${firstName.toLowerCase()}${lastName[0]}`,
      'Website URL': `www.${firstName.toLowerCase()}${lastName.toLowerCase()}.com`,
      
      'Age': 25 + (i % 45),
      'Gender': genders[i % genders.length],
      'Date of Birth': `${1980 + (i % 40)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      'Marital Status': maritalStatuses[i % maritalStatuses.length],
      'Number of Children': i % 4,
      'Household Size': 1 + (i % 5),
      'Ethnicity': ['White', 'Hispanic', 'Black', 'Asian', 'Other'][i % 5],
      'Language': ['English', 'Spanish', 'Chinese', 'French'][i % 4],
      'Education Level': ['High School', 'Bachelor', 'Master', 'PhD'][i % 4],
      'School Name': `University ${i % 10}`,
      'Graduation Year': 2000 + (i % 20),
      'Political Affiliation': ['Democrat', 'Republican', 'Independent'][i % 3],
      'Veteran Status': i % 10 === 0 ? 'Yes' : 'No',
      'Pet Owner': i % 3 === 0 ? 'Yes' : 'No',
      'Health Insurance': ['Yes', 'No'][i % 2],
      
      'Income Range': ['$30k-$50k', '$50k-$75k', '$75k-$100k', '$100k-$150k', '$150k+'][i % 5],
      'Annual Income': 40000 + (i * 2000),
      'Net Worth': 50000 + (i * 5000),
      'Credit Score': 600 + (i % 300),
      'Credit Card Type': ['Visa', 'Mastercard', 'American Express'][i % 3],
      'Bank Name': ['Chase', 'Bank of America', 'Wells Fargo', 'Citibank'][i % 4],
      'Investment Account': i % 3 === 0 ? 'Yes' : 'No',
      'Insurance Policies': i % 2 === 0 ? 'Yes' : 'No',
      'Tax Filing Status': ['Single', 'Married Filing Jointly', 'Head of Household'][i % 3],
      'Charitable Giving': i % 4 === 0 ? 'Yes' : 'No',
      'Payment Methods': ['Credit Card', 'Debit Card', 'Cash', 'Digital Wallet'][i % 4],
      'Subscription Services': i % 2 === 0 ? 'Yes' : 'No',
      'Shopping Habits': ['Online', 'In-Store', 'Both'][i % 3],
      'Brand Preferences': ['Brand A', 'Brand B', 'Brand C'][i % 3],
      'Loyalty Programs': i % 3 === 0 ? 'Yes' : 'No',
      
      'Home Owner Status': i % 2 === 0 ? 'Owner' : 'Renter',
      'Property Value': 200000 + (i * 10000),
      'Mortgage Amount': i % 2 === 0 ? 150000 + (i * 5000) : 0,
      'Square Footage': 1000 + (i * 50),
      'Number of Bedrooms': 1 + (i % 4),
      'Number of Bathrooms': 1 + (i % 3),
      'Year Built': 1980 + (i % 40),
      'Home Condition': ['Excellent', 'Good', 'Fair', 'Poor'][i % 4],
      'Home Style': ['Modern', 'Traditional', 'Contemporary'][i % 3],
      'Property Tax': 2000 + (i * 100),
      
      'Job Title': jobTitles[i % jobTitles.length],
      'Company Name': `Company ${i % 20}`,
      'Industry': industries[i % industries.length],
      'Company Size': ['Small', 'Medium', 'Large'][i % 3],
      'Department': ['Engineering', 'Sales', 'Marketing', 'Operations'][i % 4],
      'Management Level': ['Individual Contributor', 'Manager', 'Director', 'VP'][i % 4],
      'Years of Experience': 1 + (i % 20),
      'Employment Status': ['Full-Time', 'Part-Time', 'Contract'][i % 3],
      'Salary Range': ['$50k-$75k', '$75k-$100k', '$100k-$150k', '$150k+'][i % 4],
      'Skills': ['JavaScript', 'Python', 'SQL', 'React'][i % 4],
      
      'Hobbies': ['Reading', 'Gaming', 'Sports', 'Travel'][i % 4],
      'Interests': ['Technology', 'Sports', 'Music', 'Art'][i % 4],
      'Travel Frequency': ['Monthly', 'Quarterly', 'Yearly', 'Rarely'][i % 4],
      'Dining Preferences': ['Fine Dining', 'Casual', 'Fast Food'][i % 3],
      'Cuisine Preferences': ['Italian', 'Mexican', 'Asian', 'American'][i % 4],
      'Entertainment Preferences': ['Movies', 'Concerts', 'Sports', 'Theater'][i % 4],
      'Volunteer Work': i % 5 === 0 ? 'Yes' : 'No',
      'Religious Participation': ['Regular', 'Occasional', 'Rare', 'None'][i % 4],
      
      'Device Ownership': ['Smartphone', 'Tablet', 'Laptop', 'Desktop'][i % 4],
      'Smartphone Brand': ['iPhone', 'Samsung', 'Google', 'Other'][i % 4],
      'Operating System': ['iOS', 'Android', 'Windows', 'macOS'][i % 4],
      'Browser': ['Chrome', 'Safari', 'Firefox', 'Edge'][i % 4],
      'Smart Home Devices': i % 3 === 0 ? 'Yes' : 'No',
      
      'Purchase Intent': ['High', 'Medium', 'Low'][i % 3],
      'Brand Affinity': ['High', 'Medium', 'Low'][i % 3],
    })
  }
  
  return data
}

export const SAMPLE_DATA = generateSampleData()

export const exportToCSV = (data: SampleDataRow[], columns: string[], masked: boolean): void => {
  const maskValueForExport = (value: string | number, columnName: string): string => {
    if (!masked) return String(value)
    
    const lowerColumn = columnName.toLowerCase()
    if (lowerColumn.includes('name') && !lowerColumn.includes('company')) {
      return maskName(String(value))
    }
    if (lowerColumn.includes('email')) {
      return maskEmail(String(value))
    }
    if (lowerColumn.includes('phone')) {
      return maskPhone(String(value))
    }
    if (lowerColumn.includes('address') && !lowerColumn.includes('ip')) {
      return maskAddress(String(value))
    }
    if (lowerColumn.includes('ip')) {
      return maskIPAddress(String(value))
    }
    if (lowerColumn.includes('device')) {
      return maskDeviceID(String(value))
    }
    return String(value)
  }
  
  // Create CSV header
  const header = columns.join(',')
  
  // Create CSV rows
  const rows = data.map(row => 
    columns.map(col => {
      const value = row[col] || ''
      const maskedValue = maskValueForExport(value, col)
      // Escape commas and quotes in CSV
      if (String(maskedValue).includes(',') || String(maskedValue).includes('"')) {
        return `"${String(maskedValue).replace(/"/g, '""')}"`
      }
      return maskedValue
    }).join(',')
  )
  
  // Combine header and rows
  const csvContent = [header, ...rows].join('\n')
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `sample_data_${masked ? 'masked' : 'unmasked'}_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
