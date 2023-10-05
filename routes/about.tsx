import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import { BlankLayout, DefaultLayout } from '../components/Layout.tsx'
import { config } from '../conf.ts'
import { t } from '../lib/i18n.ts'

export interface PageData {
  id?: number
  uuid?: string
  hitokoto?: string
  type?: string
  from?: string
  from_who?: string
  creator?: string
  creator_uid?: number
  reviewer?: number
  commit_from?: string
  created_at?: string
  length?: number
}

export const handler: Handlers<PageData> = {
  async GET(_, ctx) {
    const resp = await fetch('https://0x-jerry.icu/api/hitokoto?t=' + Date.now)

    return ctx.render(await resp.json())
  },
}

export default function AboutPage({ data }: PageProps<PageData>) {
  const from = [data.from, data.from_who].filter(Boolean).join(' - ')

  return (
    <>
      <Head>
        <title>{t('title.index', { name: config.name })}</title>
        <link rel='stylesheet' href='style.css' />
      </Head>
      <DefaultLayout>
        <div class='flex(& col) items-center gap-4'>
          <div class='rainbow w-full p-10'>
            <div
              class='markdown-body'
              dangerouslySetInnerHTML={{ __html: config.about.content }}
            >
            </div>
          </div>

          <div
            class='relative border(1 solid gray-100) bg-black'
            style='width: 100%; aspect-ratio: 16 / 9; max-height: 500px;'
          >
            <img
              class='block object-cover w-full h-full'
              src='/api/random'
            >
            </img>
            <div
              class='w-4/5 absolute top-1/2 left-1/2 translate(-x-1/2 -y-1/2) bg(black opacity-10) p-4 rounded-lg backdrop(filter blur-sm) text(white xs) sm:(text-sm p-6) md:(p-10)'
              style='text-shadow: 0 0 2px rgb(240, 240, 240);'
            >
              <p class='italic'>「 {data.hitokoto} 」</p>
              <br />
              <p class='text-right'>--- {from}</p>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}
