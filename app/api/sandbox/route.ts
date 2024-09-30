// deporated
import { ArtifactSchema } from '@/lib/schema'
import { Sandbox, Result } from "@e2b/code-interpreter";

const sandboxTimeout = 10 * 60 * 1000 // 10 minute in ms
// const templateId = 'toyw6mhmdw42n4wyhdcb'
const templateId = 'my-slidev-developer'
const filePath = '/home/user/slides.md'

export const maxDuration = 60
export type ExecutionResult = {
  code: string
}

export async function POST(req: Request) {
  const { artifact, userID, apiKey }: { artifact: ArtifactSchema, userID: string, apiKey: string } = await req.json()

  const sbx =  await Sandbox.create(templateId, { metadata: { template: templateId, userID: userID }, timeoutMs: sandboxTimeout, apiKey })
  if (artifact.code) {
    await sbx.files.write(filePath, artifact.code)
  } 

  return new Response(JSON.stringify({
    url: `https://${sbx?.getHost(3030)}`
  }))
  
}
