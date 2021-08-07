import MarkdownIt from 'markdown-it'
import markdownItClass from '@toycode/markdown-it-class'
import blockEmbedPlugin from 'markdown-it-block-embed'

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
  .use(blockEmbedPlugin, {
    youtube: {
      width: '100%'
    }
  })

export const useMarkdown = () => {
  return {
    renderString: (content: string) => (content ? md.render(content) : ''),
    render: (content: string) =>
      content ? md.render(decodeURIComponent(escape(atob(content)))) : ''
  }
}
