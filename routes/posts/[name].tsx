import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import { DefaultLayout } from '../../components/Layout.tsx'
import { Tag } from '../../components/Tag.tsx'
import { renderPost } from '../../lib/markdown.ts'
import { PostMatter } from '../../types/index.ts'

interface PageData {
  data: PostMatter
  content: string
}

export const handler: Handlers<PageData> = {
  async GET(req, ctx) {
    const filename = new URL(req.url).pathname

    const markdown = await renderPost<PostMatter>(`${filename}.md`)

    return ctx.render(markdown)
  },
}

export default function Post({ data }: PageProps<PageData>) {
  const Tags = () => {
    const tags = data.data.tags
    if (!tags?.length) return <></>
    return (
      <div class='flex(& wrap) gap-1 mb-4'>
        {data.data.tags?.map((tag) => <Tag href={`/tags/${tag}`}>{tag}</Tag>)}
      </div>
    )
  }

  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/speed-highlight/core@1.1.7/src/themes/github-light.css'
        />
      </Head>
      <DefaultLayout title={data.data.title} showBack comments>
        <Tags />

        <div
          class='markdown-body'
          dangerouslySetInnerHTML={{ __html: data.content }}
        >
        </div>
      </DefaultLayout>
    </>
  )
}
