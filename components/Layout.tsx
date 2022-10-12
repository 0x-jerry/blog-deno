import { Head } from '$fresh/runtime.ts'
import { Icon } from './Icon.tsx'
import { JSX, RenderableProps } from 'preact'
import { config } from '../conf.ts'

export function Sidebar(props: RenderableProps<JSX.HTMLAttributes>) {
  return (
    <div {...props} className='h-screen'>
      <div class='h-full w-8 border(r gray-100)'></div>
      <div class='h-full w-72 border(r gray-100) flex(& col) items-center pt-32 px-6'>
        <a href='/'>
          <img
            class='rounded-full w-40 transition duration-1000 rotate(0 hover:[360deg])'
            src='https://avatars.githubusercontent.com/u/14226737?v=4'
          />
        </a>
        <div class='mt-4 text-3xl'>{config.name}</div>
        <div
          class='my-2 text-gray-400 text-xs'
          dangerouslySetInnerHTML={{ __html: config.motto }}
        ></div>
        <div class='mt-2'>
          <a href={config.links.github} target='_blank'>
            <Icon name='logos:github-icon'></Icon>
          </a>
        </div>
      </div>
    </div>
  )
}

export function DefaultLayout(props: RenderableProps<{ title?: string }>) {
  return (
    <>
      <Head>
        <script src='https://code.iconify.design/3/3.0.0/iconify.min.js'></script>
      </Head>
      <div>
        <Sidebar class='hidden sm:flex fixed left-0 top-0'></Sidebar>
        <div class='pl-0 sm:pl-80 mx-10 pt-3'>
          {props.title && (
            <>
              <h1 class='text-2xl'>{props.title}</h1>
              <hr class='mt-2 mb-4' />
            </>
          )}

          {props.children}
        </div>
      </div>
    </>
  )
}
