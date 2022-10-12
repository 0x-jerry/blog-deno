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
  const PostTitle = () => (
    <div class='flex gap-1 items-end'>
      <h1 class='text-2xl'>{data.data.title}</h1>
      {data.data.tags?.map((tag) => (
        <Tag href={`/tags/${tag}`}>{tag}</Tag>
      ))}
    </div>
  )

  return (
    <>
      <Head>
        <title>{data.data.title}</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css'
          integrity='sha512-KUoB3bZ1XRBYj1QcH4BHCQjurAZnCO3WdrswyLDtp7BMwCw7dPZngSLqILf68SGgvnWHTD5pPaYrXi6wiRJ65g=='
          crossOrigin='anonymous'
          referrerpolicy='no-referrer'
        />
      </Head>
      <DefaultLayout title={PostTitle()}>
        <div
          class='markdown-body'
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      </DefaultLayout>
    </>
  )
}
