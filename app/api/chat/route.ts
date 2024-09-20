import {
  streamObject,
  LanguageModel,
  CoreMessage,
} from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic';

import ratelimit from '@/lib/ratelimit'
import { artifactSchema } from '@/lib/schema'

export type LLMModel = {
  id: string
  name: string
  provider: string
  providerId: string
}

export type LLMModelConfig = {
  model?: string
  apiKey?: string
  baseURL?: string
  temperature?: number
  topP?: number
  topK?: number
  frequencyPenalty?: number
  presencePenalty?: number
  maxTokens?: number
}

export const maxDuration = 60

const rateLimitMaxRequests = 5
const ratelimitWindow = '1m'

interface Req {
  messages: CoreMessage[],
  userID: string,
  model: LLMModel,
  config: LLMModelConfig
}

export async function POST(req: Request) {
  const limit = await ratelimit(req.headers.get('x-forwarded-for'), rateLimitMaxRequests, ratelimitWindow)
  if (limit) {
    return new Response('You have reached your request limit for the day.', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.amount.toString(),
        'X-RateLimit-Remaining': limit.remaining.toString(),
        'X-RateLimit-Reset': limit.reset.toString()
      }
    })
  }

  const { messages, userID, config, model } = await req.json() as Req

  console.log('userID', userID)
  console.log('config', config)

  const client = createAnthropic({ apiKey: config.apiKey, baseURL: config.baseURL })('claude-3-5-sonnet-20240620')

  const stream = await streamObject({
    ...config,
    model: client as LanguageModel,
    schema: artifactSchema,
    system: ``,
    messages
  })

  return stream.toTextStreamResponse()
}
