import * as path from '$std/path/mod.ts'
import { marked } from 'https://esm.sh/marked@4.1.1?dts'
import { extract as frontMatter } from '$std/encoding/front_matter.ts'

marked.use()

export async function render<T>(file: string) {
  const base = path.fromFileUrl(import.meta.url)

  const filePath = path.join(base, '../../docs', file)

  const txt = await Deno.readTextFile(filePath)

  const data = frontMatter(txt)

  const result = marked.parse(data.body)

  return {
    data: data.attrs as T,
    content: result
  }
}

export { frontMatter }
