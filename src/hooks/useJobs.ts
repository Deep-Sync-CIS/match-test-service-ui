import { useQuery } from '@tanstack/react-query'
import { Job } from '../types'
import { mockJobs } from '../utils/constants'

// Example API service function (replace with actual API call)
async function fetchJobs(): Promise<Job[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockJobs
}

// React Query hook for fetching jobs
export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  })
}

// Example: Fetch single job by ID
export function useJob(jobId: number | null) {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => {
      if (!jobId) return null
      const jobs = await fetchJobs()
      return jobs.find((job) => job.id === jobId) || null
    },
    enabled: !!jobId,
  })
}

