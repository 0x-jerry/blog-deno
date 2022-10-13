import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import { DefaultLayout } from '../../components/Layout.tsx'
import { Tag } from '../../components/Tag.tsx'
import { render } from '../../lib/markdown.ts'
import { PostMatter } from '../../types/index.ts'

interface PageData {
  data: PostMatter
  content: string
}

export const handler: Handlers<PageData> = {
  async GET(req, ctx) {
    const filename = new URL(req.url).pathname

    const markdown = await render<PostMatter>(`${filename}.md`)

    return ctx.render(markdown)
  }
}

export default function Post({ data }: PageProps<PageData>) {
  const Title = () => (
    <>
      <div class='flex gap-1 items-end'>
        <h1 class='text-2xl'>{data.data.title}</h1>
        {data.data.tags?.map((tag) => (
          <Tag href={`/tags/${tag}`}>{tag}</Tag>
        ))}
      </div>
    </>
  )

  return (
    <>
      <Head>
        <title>{data.data.title}</title>
      </Head>
      <DefaultLayout title={Title()} showBack>
        <div
          class='markdown-body'
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      </DefaultLayout>
    </>
  )
}
