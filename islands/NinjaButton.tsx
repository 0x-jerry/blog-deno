import { RenderableProps } from 'https://esm.sh/v95/preact@10.11.0/src/index.d.ts'
import { Button } from '../components/Button.tsx'
import { Icon } from '../components/Icon.tsx'

export default function NinjaButton(_props: RenderableProps<{}>) {
  function show() {
    document.querySelector('ninja-keys')?.open()
  }

  return (
    <Button class='w-full' onClick={show}>
      <Icon name='carbon:search' title='搜一搜'></Icon>
      <span class='flex-1 hidden lg:inline-block'>搜一搜</span>
    </Button>
  )
}
