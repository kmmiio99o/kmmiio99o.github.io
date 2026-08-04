declare module 'react-dom/client' {
  import * as ReactDOM from 'react-dom'
  export function createRoot(container: Element | DocumentFragment): { render(element: React.ReactNode): void }
  export type Root = any
  export * from 'react-dom'
}
