import { Button } from '../components/Button.tsx'
import { BlankLayout } from '../components/Layout.tsx'

export function ServerCodePage(props: {
  serverCode: number
  codeDescription: string
}) {
  return (
    <BlankLayout>
      <div class='flex(& col) justify-center items-center min-h-screen'>
        <h1 class='font-bold text-8xl'>{props.serverCode}</h1>
        <div class='my-4 text-xl'>{props.codeDescription}</div>
        <a href='/'>
          <Button>Take me home</Button>
        </a>
      </div>
    </BlankLayout>
  )
}

export default function PageNotFound() {
  return ServerCodePage({
    serverCode: 404,
    codeDescription: "Couldn't find what you're looking for."
  })
}
