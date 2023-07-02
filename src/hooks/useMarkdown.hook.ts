import { decodeBase64ToUTF8 } from '@/utils/decodeBase64ToUTF8'
import { html5Media } from '@/utils/markdown/markdown-html5-media'
import markdownItClass from '@toycode/markdown-it-class'
import MarkdownIt from 'markdown-it'
import blockEmbedPlugin from 'markdown-it-block-embed'
import markdownItCheckbox from 'markdown-it-checkbox'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItSvgCodeCopy from 'markdown-it-svg-code-copy'

const md = new MarkdownIt({
  typographer: true,
  quotes: ['«\xA0', '\xA0»', '‹\xA0', '\xA0›']
})
  .use(markdownItClass, {
    h1: ['title', 'is-2'],
    h2: ['title', 'is-3'],
    h3: ['title', 'is-4'],
    h4: ['title', 'is-5'],
    h5: ['title', 'is-6'],
    h6: ['title', 'is-6'],
    table: ['table', 'is-fullwidth']
  })
  .use(html5Media)
  .use(blockEmbedPlugin, {
    youtube: {
      width: '100%'
    }
  })
  .use(markdownItCheckbox)
  .use(markdownItSvgCodeCopy, {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3a47" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <rect x="8" y="8" width="10" height="10" rx="2" />
  <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
</svg>`,
    buttonClass: 'button is-light'
  })
  .use(markdownItFootnote)

export const useMarkdown = (defaultPrefix?: string) => {
  return {
    toHTML: (content: string) => (content ? md.render(content) : ''),
    render: (content: string, prefix?: string) =>
      content
        ? md.render(decodeBase64ToUTF8(content), {
            docId: defaultPrefix ?? prefix ?? ''
          })
        : ''
  }
}
