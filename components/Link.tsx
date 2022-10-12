import { RenderableProps, JSX } from 'preact'

export function Link(props:RenderableProps<JSX.HTMLAttributes>) {
    
    return <a className='text(blue-500 hover:blue-600) hover:underline' {...props}>
        {props.children}
    </a>
}