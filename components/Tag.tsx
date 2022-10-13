import { RenderableProps } from 'preact'

const tw = String.raw

const colorMap: Record<string, string> = {
  default: tw`border-gray-100 bg-gray-50 text-gray-500 hover:text-gray-700`,
  blue: tw`border-blue-100 bg-blue-50 text-blue-500 hover:text-blue-700`
}

export function Tag(props: RenderableProps<{ color?: string; href?: string }>) {
  const clx = colorMap[props.color || 'default'] || colorMap.default

  const tag = (
    <span class='border rounded text-xs px-2 font-mono' className={clx}>
      {props.children}
    </span>
  )

  if (props.href) {
    return <a href={props.href}>{tag}</a>
  }

  return tag
}
