import * as path from 'https://deno.land/std@0.159.0/path/mod.ts'
import { marked } from 'https://esm.sh/marked@4.1.1?dts'

marked.use()

export async function render(file: string) {
  const base = path.fromFileUrl(import.meta.url)

  const filePath = path.join(base, '../../docs', file)

  const txt = await Deno.readTextFile(filePath)

  const result = marked.parse(txt)

  return result
}
