import { Handlers } from '$fresh/server.ts'
import Fuse from 'https://esm.sh/fuse.js@6.6.2'
import { PostItem } from '../../types/index.ts'
import { getPosts } from '../../utils/posts.ts'

type SearchPostItem = Omit<PostItem, 'content'>

export type SearchResult = Fuse.FuseResult<SearchPostItem>[]

async function createSearcher() {
  const posts: PostItem[] = await getPosts()

  const fuse = new Fuse(posts, {
    keys: [
      //
      'data.title',
      'data.tags',
      'content'
    ]
  })

  return function search(text: string) {
    const res = fuse.search(text)
    return res.map((item) => {
      const { content, ...other } = item.item

      return {
        ...item,
        item: other
      }
    })
  }
}

let searcher: (text: string) => SearchResult

export const handler: Handlers = {
  async GET(_, _ctx) {
    searcher ||= await createSearcher()

    const u = new URL(_.url)

    const result = searcher(decodeURIComponent(u.searchParams.get('q') || ''))

    return new Response(JSON.stringify(result), {
      headers: { 'content-type': 'application/json; charset=UTF-8' }
    })
  }
}
