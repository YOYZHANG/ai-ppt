import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { artifact} = await req.json()

    const fileName = `ppt_${Date.now()}.html`;
    const filePath = path.join(process.cwd(),'public', 'presentations', fileName);
    await fs.writeFile(filePath, artifact.code, () => {});


    // Send file URL back to client
    return new Response(JSON.stringify({
      url: `presentations/${fileName}`
    }))
}
