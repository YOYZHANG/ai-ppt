import { z } from 'zod'

export const artifactSchema = z.object({
  commentary: z.string().describe(`Describe what you're about to do and the steps you want to take for generating the artifact in great detail.`),
  title: z.string().describe('Short title of the artifact. Max 3 words.'),
  description: z.string().describe('Short description of the artifact. Max 1 sentence.'),
  code: z.string().describe('Code generated by the artifact. Only runnable code is allowed.'),
})

export type ArtifactSchema = z.infer<typeof artifactSchema>