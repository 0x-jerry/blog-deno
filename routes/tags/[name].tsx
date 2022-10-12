import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import { DefaultLayout } from '../../components/Layout.tsx'
import PostItemLink from '../../components/PostItemLink.tsx'
import { PostItem } from '../../types/index.ts'
import { getPosts } from '../../utils/posts.ts'

interface PageData {
  tag: string
  items: PostItem[]
}

export const handler: Handlers<PageData> = {
  async GET(_, ctx) {
    const posts = await getPosts()
    const tag = decodeURIComponent(ctx.params.name)

    return ctx.render({
      tag,
      items: posts.filter((n) => n.data.tags?.includes(tag))
    })
  }
}

export default function TagPage({ data }: PageProps<PageData>) {
  return (
    <>
      <Head>
        <title>{data.tag}</title>
      </Head>
      <DefaultLayout title={data.tag} showBack>
        <div class='flex(& col) gap-2'>
          {data.items.map((item) => (
            <PostItemLink {...item}></PostItemLink>
          ))}
        </div>
      </DefaultLayout>
    </>
  )
}
