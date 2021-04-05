declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}
declare module 'pouchdb-adapter-indexeddb'
declare module '@toycode/markdown-it-class'
declare module 'markdown-it-block-embed'
