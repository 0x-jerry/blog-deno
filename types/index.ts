export interface PostMatter {
  title: string
  date: Date
  tags?: string[]
  license?: string
  publish?: boolean
}

export interface PostItem {
  path: string
  data: PostMatter
}