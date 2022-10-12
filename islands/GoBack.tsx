import { JSX, RenderableProps } from 'preact'
import { Icon } from '../components/Icon.tsx'

export default function GoBack(props: RenderableProps<JSX.HTMLAttributes>) {
  const onClick = () => {
    if (props.href) {
      return
    }

    return history.back()
  }

  return (
    <a
      {...props}
      onClick={onClick}
      class={['cursor-pointer flex', props.class].join(' ')}
    >
      <Icon background name='carbon:arrow-left'></Icon>
    </a>
  )
}
