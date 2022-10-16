import { fromFileUrl, join } from '$std/path/mod.ts'
import { frontMatter } from '../lib/markdown.ts'
import { PostItem, PostMatter } from '../types/index.ts'

export async function getPosts(opt?: { includeUnpublished?: boolean }) {
  const folder = fromFileUrl(import.meta.resolve('../docs/posts'))

  const files = Deno.readDir(folder)

  let list: PostItem[] = []

  for await (const file of files) {
    if (file.isFile && file.name.endsWith('.md')) {
      const filePath = join(folder, file.name)
      const txt = await Deno.readTextFile(filePath)
      const matter = frontMatter<PostMatter>(txt)

      const name = file.name.slice(0, -'.md'.length)

      list.push({
        path: name,
        data: matter.attrs,
        content: matter.body,
      })
    }
  }

  list = list.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())

  if (!opt?.includeUnpublished) {
    list = list.filter((n) => n.data.publish !== false)
  }

  return list
}
