import { z } from 'zod'

export const artifactSchema = z.object({
  commentary: z.string().describe(`Describe what you're about to do and the steps you want to take for generating the code in great detail.`),
  title: z.string().describe('Short title of the code. Max 3 words.'),
  description: z.string().describe('Short description of the code. Max 1 sentence.'),
  code: z.string().describe('code generated. Only runnable code is allowed.'),
})

export type ArtifactSchema = z.infer<typeof artifactSchema>
