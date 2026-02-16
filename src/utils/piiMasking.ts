/**
 * PII Masking Utilities
 * Masks sensitive personally identifiable information (PII) for privacy protection
 */

export const maskName = (name: string): string => {
  if (!name || name.length === 0) return name
  if (name.length <= 2) return `${name[0]}***`
  return `${name[0]}***`
}

export const maskEmail = (email: string): string => {
  if (!email || !email.includes('@')) return email
  const [localPart, domain] = email.split('@')
  if (localPart.length <= 2) return `${localPart[0]}***@${domain}`
  return `${localPart.substring(0, 2)}***@${domain}`
}

export const maskPhone = (phone: string): string => {
  if (!phone) return phone
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 4) return phone
  // Show last 4 digits
  const lastFour = digits.slice(-4)
  return `***-***-${lastFour}`
}

export const maskAddress = (address: string): string => {
  if (!address) return address
  // Keep street number, mask the rest
  const parts = address.split(' ')
  if (parts.length === 0) return address
  const streetNumber = parts[0]
  return `${streetNumber} *** Street`
}

export const maskIPAddress = (ip: string): string => {
  if (!ip) return ip
  const parts = ip.split('.')
  if (parts.length !== 4) return ip
  return `${parts[0]}.***.***.${parts[3]}`
}

export const maskDeviceID = (deviceId: string): string => {
  if (!deviceId) return deviceId
  if (deviceId.length <= 8) return `${deviceId.substring(0, 8)}***`
  return `${deviceId.substring(0, 8)}***`
}

export const maskValue = (value: string | number, type: string): string => {
  if (value === null || value === undefined || value === '') return String(value || '')
  const stringValue = String(value).trim()
  if (!stringValue) return stringValue
  
  const normalizedType = type.toLowerCase().replace(/\s+/g, '')

  // Check for name-related columns (First Name, Last Name, Full Name)
  if (normalizedType.includes('name') && !normalizedType.includes('username') && !normalizedType.includes('schoolname')) {
    return maskName(stringValue)
  }
  
  // Check for email-related columns
  if (normalizedType.includes('email') || normalizedType.includes('emailaddress')) {
    return maskEmail(stringValue)
  }
  
  // Check for phone-related columns (Phone Number, Mobile Phone, Work Phone)
  if (normalizedType.includes('phone') || normalizedType.includes('phonenumber') || normalizedType.includes('mobile') || normalizedType.includes('workphone')) {
    return maskPhone(stringValue)
  }
  
  // Check for address-related columns (Street Address, but not City/State/ZIP alone)
  if ((normalizedType.includes('address') || normalizedType.includes('streetaddress') || normalizedType.includes('street')) && 
      !normalizedType.includes('city') && !normalizedType.includes('state') && !normalizedType.includes('zip') && !normalizedType.includes('postal')) {
    return maskAddress(stringValue)
  }
  
  // Check for IP address columns
  if (normalizedType.includes('ipaddress') || normalizedType === 'ip') {
    return maskIPAddress(stringValue)
  }
  
  // Check for device ID columns (Device ID, Cookie ID, MAID)
  if (normalizedType.includes('deviceid') || normalizedType.includes('device_id') || 
      normalizedType.includes('maid') || (normalizedType.includes('device') && normalizedType.includes('id')) ||
      normalizedType.includes('cookieid') || normalizedType.includes('cookie')) {
    return maskDeviceID(stringValue)
  }
  
  // Check for SSN
  if (normalizedType.includes('socialsecurity') || normalizedType.includes('ssn')) {
    return maskDeviceID(stringValue) // Use device ID masking for SSN
  }
  
  return stringValue
}
