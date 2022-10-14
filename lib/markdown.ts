import * as path from '$std/path/mod.ts'
import { marked } from 'https://esm.sh/marked@4.1.1?dts'
import { extract as frontMatter } from '$std/encoding/front_matter.ts'
import { highlightText } from 'https://cdn.jsdelivr.net/gh/speed-highlight/core/src/index.js'
import { supportedLanguages } from './highlighter/languages.ts'

const highlightLangAliases: Record<string, string[]> = {
  ts: ['typescript'],
  js: ['javascript'],
  yaml: ['yml'],
  docker: ['dockerfile'],
  bash: ['sh']
}

function getLang(lang?: string) {
  if (!lang) return 'bash'

  lang = lang.split(/\s+/).at(0)
  lang = lang?.toLowerCase()

  const entries = Object.entries(highlightLangAliases)
  for (const [id, aliases] of entries) {
    if (aliases.includes(lang!)) {
      return id
    }
  }

  return lang || 'bash'
}

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
    },
    code(code, lang, _isEscaped) {
      lang = getLang(lang)

      return `<pre class="language-${lang} shj-mode-header shj-lang-${lang} shj-multiline" data-lang="${lang}">${code}</pre>`
    }
  },
  highlight(code, lang, callback) {
    lang = getLang(lang)!

    if (!supportedLanguages.includes(lang)) {
      callback?.(null, code)
      return
    }

    highlightText(code, lang, true).then((html: string) => {
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
