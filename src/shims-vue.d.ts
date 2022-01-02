declare module '*.vue' {
  import { value defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}
declare module 'pouchdb-adapter-indexeddb'
declare module '@toycode/markdown-it-class'
declare module 'markdown-it-block-embed'
declare module 'markdown-it-checkbox'
declare module 'markdown-it-footnote'
declare module 'markdown-it-html5-media'
