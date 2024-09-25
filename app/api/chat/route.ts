import {
  streamObject,
  LanguageModel,
  CoreMessage,
} from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import {htmlTemplate} from '@/lib/template'

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

  const { messages, userID } = await req.json() as Req

  console.log('userID', userID)
  console.log('messages', messages)

  const client = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY})('models/gemini-1.5-flash-latest')
  const stream = await streamObject({
    model: client as LanguageModel,
    schema: artifactSchema,
    system: `
      Generate a visually appealing reveal.js presentation in HTML.
      The presentation should include the following slides: title, content types like bullet points.
      Each slide should better contains images, texts with custom styles.
      use the template: ${htmlTemplate}
    `,
    messages
  })

  return stream.toTextStreamResponse()
}
