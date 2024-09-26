import ratelimit from '@/lib/ratelimit'

export const maxDuration = 60

const rateLimitMaxRequests = 10
const ratelimitWindow = '1d'


export async function GET(req: Request) {
  const limit = await ratelimit(req.headers.get('x-forwarded-for'), rateLimitMaxRequests, ratelimitWindow)

  if (limit && !limit?.success) {
    return new Response('You have reached your request limit for the day.', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.amount.toString(),
        'X-RateLimit-Remaining': limit.remaining.toString(),
        'X-RateLimit-Reset': limit.reset.toString()
      }
    })
  }

  return new Response(JSON.stringify(limit))
}
