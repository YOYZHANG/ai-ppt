import { z } from 'zod'

export const artifactSchema = z.object({
  commentary: z.string().describe(`Describe what you're about to do and the steps you want to take for generating the markdown in great detail.`),
  title: z.string().describe('Short title of the markdown. Max 3 words.'),
  description: z.string().describe('Short description of the markdown. Max 1 sentence.'),
  markdown: z.string().describe('markdown generated. Only runnable code is allowed.'),
})

export type ArtifactSchema = z.infer<typeof artifactSchema>
