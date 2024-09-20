import { ArtifactSchema } from '@/lib/schema'
import { Sandbox, Result, ExecutionError } from "@e2b/code-interpreter";

const sandboxTimeout = 10 * 60 * 1000 // 10 minute in ms
const templateId = 'slidev'
const filePath = 'slidev.md'

export const maxDuration = 60


export type ExecutionResult = {
  stdout: string[]
  stderr: string[]
  runtimeError?: ExecutionError
  cellResults: Result[]
  url: string
}

export async function POST(req: Request) {
  const { artifact, userID, apiKey }: { artifact: ArtifactSchema, userID: string, apiKey: string } = await req.json()
  console.log('artifact', artifact)
  console.log('userID', userID)
  console.log('apiKey', apiKey)

  const sbx =  await Sandbox.create(templateId, { metadata: { template: templateId, userID: userID }, timeoutMs: sandboxTimeout, apiKey }) as any
  
  console.log('Created sandbox', sbx)

  if (artifact.markdown) {
    await sbx.files.write(filePath, artifact.markdown)
    console.log(`Copied file`)
  }

  return new Response(JSON.stringify({
    template: templateId,
    url: `https://${sbx?.getHost(80)}`
  }))
  
}
