import * as path from '$std/path/mod.ts'
import { marked } from 'https://esm.sh/marked@4.1.1?dts'
import { extract as frontMatter } from '$std/encoding/front_matter.ts'
import { highlightText } from 'https://cdn.jsdelivr.net/gh/speed-highlight/core@1.1.7/src/index.js'
import { languages, supportedLanguages } from './highlighter/languages.ts'

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
  },
  highlight(code, lang, callback) {
    lang = lang.split(/\s+/).at(0) || ''
    lang = languages.find((n) => n.aliases?.includes(lang))?.lang || lang

    if (!supportedLanguages.includes(lang)) {
      callback?.(null, code)
      return
    }

    highlightText(code, lang, false).then((html: string) => {
      callback?.(null, html)
    })
  }
})

export async function renderPost<T>(file: string) {
  const base = path.fromFileUrl(import.meta.url)

  const filePath = path.join(base, '../../docs', file)

  return await render<T>(filePath)
}

export async function render<T>(file: string) {
  const txt = await Deno.readTextFile(file)

  const data = (() => {
    try {
      return frontMatter(txt)
    } catch (_error) {
      return {
        body: txt,
        attrs: {}
      }
    }
  })()

  const result = await parseMarkdown(data.body)

  return {
    data: data.attrs as T,
    content: result
  }
}

function parseMarkdown(markdown: string) {
  return new Promise<string>((resolve, reject) => {
    marked.parse(markdown, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

export { frontMatter }
