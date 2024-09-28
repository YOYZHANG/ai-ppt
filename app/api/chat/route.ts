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
  const { messages } = await req.json() as Req

  const client = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY})('models/gemini-1.5-flash-latest')
  const stream = await streamObject({
    model: client as LanguageModel,
    schema: artifactSchema,
    system: `
      Generate a visually appealing reveal.js presentation in HTML.
      The presentation should include the following slides: appealing cover, bullet points with links, conclusion and end page.
      more than 6 slides.
      use the template: ${htmlTemplate}
    `,
    messages
  })

  return stream.toTextStreamResponse()
}
