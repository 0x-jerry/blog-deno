import { Handlers } from '$fresh/server.ts'

export const handler: Handlers = {
  async GET(_, _ctx) {
    const imageUrl = await getImage()

    return new Response(null, {
      status: 302,
      headers: {
        'cache-control': 'public, max-age=60',
        location: imageUrl
      }
    })
  }
}

const prefix = ['https://cdn.jsdelivr.net/gh/']

const cdnRoot = prefix[0] + '/0x-jerry/static/'

const repoFilesUrl =
  'https://api.github.com/repos/0x-jerry/static/git/trees/main?recursive=1'

async function getAllImages() {
  const data = await get<GithubTreeType>(repoFilesUrl)
  const files = data.tree
    .filter((f) => f.type === 'blob' && /^images/.test(f.path))
    .map((f) => cdnRoot + f.path)

  return files
}

async function getImage(id = Math.random().toString()) {
  const images = await getAllImages()

  let idx = new Date().getTime()

  for (const c of String(id)) {
    idx += c.charCodeAt(0)
  }

  return images[idx % images.length]
}

async function get<T = any>(url: string): Promise<T> {
  const r = await fetch(url)
  return r.json()
}

export interface GithubTreeType {
  sha: string
  url: string
  tree: Tree[]
  truncated: boolean
}

export interface Tree {
  path: string
  mode: string
  type: string
  sha: string
  size?: number
  url: string
}
