'use client'
import posthog from 'posthog-js'
import { PostHogProvider as PostHogProviderJS } from 'posthog-js/react'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '', {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  person_profiles: 'identified_only',
  session_recording: {
    recordCrossOriginIframes: true,
  }
})

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProviderJS client={posthog}>
      {children}
    </PostHogProviderJS>
  )
}
