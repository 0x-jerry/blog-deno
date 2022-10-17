import { Head } from '$fresh/src/runtime/head.ts'
import { useSignal } from '@preact/signals'
import { SearchResult } from '../routes/api/search.ts'
import { INinjaAction } from 'https://esm.sh/@0x-jerry/ninja-keys@1.2.5'

const buildDefaultNinjaItems: () => INinjaAction[] = () => [
  {
    id: 'Home',
    title: 'Home',
    mdIcon: 'home',
    handler: () => {
      location.href = '/'
    }
  },
  {
    id: 'Tags',
    title: 'Tags',
    mdIcon: 'tag',
    handler: () => {
      location.href = '/tags'
    }
  },
  {
    id: 'Archive',
    title: 'Archives',
    mdIcon: 'archive',
    handler: () => {
      location.href = '/archives'
    }
  },
  {
    id: 'About',
    title: 'About',
    mdIcon: 'person',
    handler: () => {
      location.href = '/about'
    }
  }
]

export default function NinjaBox() {
  const defaultItems = buildDefaultNinjaItems()
  const items = useSignal([...defaultItems] as INinjaAction[])

  async function onChange(e: Event) {
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    const q = encodeURIComponent(e.detail.search)

    const resp = await fetch(`/api/search?q=${q}`)
    const data: SearchResult = await resp.json()

    const resultItems = data.map((item) => {
      const action: INinjaAction = {
        id: item.refIndex.toString(),
        title: item.item.data.title,
        tags: item.item.data.tags,
        handler: () => {
          location.href = `/posts/${item.item.path}`
        }
      }

      return action
    })

    items.value = [...resultItems, ...defaultItems]
  }

  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css?family=Material+Icons&display=swap'
          rel='stylesheet'
        />
        <script
          type='module'
          src='https://esm.sh/@0x-jerry/ninja-keys@1.2.5'
        ></script>
      </Head>
      <ninja-keys onChange={onChange} data={items.value} placeholder="Type something to search article..." hideBreadcrumbs></ninja-keys>
    </>
  )
}
