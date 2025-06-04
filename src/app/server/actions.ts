/**
 * Server actions used to retrieve data for the dashboard. Some helpers now
 * fetch data from the API defined in `API_URL` while others still use the
 * static fake database.
 */

'use server'

// Data Imports
import { db as academyData } from '@/fake-db/apps/academy'
import { db as vehicleData } from '@/fake-db/apps/logistics'
import { db as permissionData } from '@/fake-db/apps/permissions'
import { db as profileData } from '@/fake-db/pages/userProfile'
import { db as faqData } from '@/fake-db/pages/faq'
import { db as pricingData } from '@/fake-db/pages/pricing'
import { db as statisticsData } from '@/fake-db/pages/widgetExamples'

const API_URL = process.env.API_URL || 'http://localhost:12000/api'

export const getEcommerceData = async () => {
  const res = await fetch(`${API_URL}/products`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch products')
  const products = await res.json()
  return { products }
}

export const getAcademyData = async () => {
  return academyData
}

export const getLogisticsData = async () => {
  return vehicleData
}

export const getInvoiceData = async () => {
  const res = await fetch(`${API_URL}/invoices`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch invoices')
  return await res.json()
}

export const getUserData = async () => {
  const res = await fetch(`${API_URL}/users`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch users')
  return await res.json()
}

export const getPermissionsData = async () => {
  return permissionData
}

export const getProfileData = async () => {
  return profileData
}

export const getFaqData = async () => {
  return faqData
}

export const getPricingData = async () => {
  return pricingData
}

export const getStatisticsData = async () => {
  return statisticsData
}
