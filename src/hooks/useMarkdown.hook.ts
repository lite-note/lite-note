import { decodeBase64ToUTF8 } from '@/utils/decodeBase64ToUTF8'
import { html5Media } from '@/utils/markdown/markdown-html5-media'
import { twitterPlugin } from '@/utils/markdown/markdown-it-twitter'
import markdownItClass from '@toycode/markdown-it-class'
import MarkdownIt from 'markdown-it'
import blockEmbedPlugin from 'markdown-it-block-embed'
import markdownItCheckbox from 'markdown-it-checkbox'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItIframe from 'markdown-it-iframe'
import markdownItLatex from 'markdown-it-latex'
import { Ref, toValue } from 'vue'

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
  .use(twitterPlugin)
  .use(markdownItCheckbox)
  .use(markdownItFootnote)
  .use(markdownItLatex)
  .use(markdownItIframe, {
    width: '100%',
    height: 400
  })

export const useMarkdown = (defaultPrefix?: Ref<string> | string) => {
  return {
    toHTML: (content: string) => (content ? md.render(content) : ''),
    render: (content: string, prefix?: string) =>
      content
        ? md.render(decodeBase64ToUTF8(content), {
            docId: defaultPrefix ? toValue(defaultPrefix) : prefix ?? ''
          })
        : ''
  }
}
