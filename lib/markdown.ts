import * as path from '$std/path/mod.ts'
import { marked } from 'https://esm.sh/marked@4.1.1?dts'
import { extract as frontMatter } from '$std/encoding/front_matter.ts'

marked.use({
  renderer: {
    link(href, title, text) {
      const isAbs = /^https?:\/\//.test(href || '')

      if (!isAbs) {
        if (href && /\.md$/.test(href)) {
          href = href?.slice(0, -'.md'.length)
        }
        return `<a href="${href}" title="${title || href}">${text}</a>`
      } else {
        return `<a href="${href}" target="_blank" title="${
          title || href
        }" >${text}</a>`
      }
    }
  }
})

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
