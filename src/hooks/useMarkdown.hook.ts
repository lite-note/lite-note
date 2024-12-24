import markdownItClass from '@toycode/markdown-it-class'
import markdownItLatex from '@vscode/markdown-it-katex'
import MarkdownIt from 'markdown-it'
import Renderer from 'markdown-it/lib/renderer'
import blockEmbedPlugin from 'markdown-it-block-embed'
import markdownItCheckbox from 'markdown-it-checkbox'
import markdownItFootnote from 'markdown-it-footnote'
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts'
import markdownItIframe from 'markdown-it-iframe'
import Shikiji from 'markdown-it-shikiji'
import { Ref, toValue } from 'vue'

import { decodeBase64ToUTF8 } from '@/utils/decodeBase64ToUTF8'
import { html5Media } from '@/utils/markdown/markdown-html5-media'
import { twitterPlugin } from '@/utils/markdown/markdown-it-twitter'

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
    h6: ['title', 'is-6']
  })
  .use(html5Media)
  .use(blockEmbedPlugin, {
    youtube: {
      width: '100%',
      height: 300
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
  .use(MarkdownItGitHubAlerts)

const useShikiji = async () => {
  md.use(
    await Shikiji({
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-black'
      }
    })
  )
}

useShikiji()

const rules: Renderer.RenderRuleRecord = {
  table_open: () =>
    '<div class="overflow-x-auto"><table class="table table-zebra">',
  table_close: () => '</table></div>'
}

md.renderer.rules = { ...md.renderer.rules, ...rules }

export const useMarkdown = (defaultPrefix?: Ref<string> | string) => {
  const getRawContent = (content: string) => decodeBase64ToUTF8(content)
  const renderFromUTF8 = (content: string, prefix?: string) =>
    content
      ? md.render(content, {
          docId: defaultPrefix ? toValue(defaultPrefix) : (prefix ?? '')
        })
      : ''

  return {
    toHTML: (content: string) => (content ? md.render(content) : ''),
    render: (content: string, prefix?: string) =>
      renderFromUTF8(decodeBase64ToUTF8(content), prefix),
    renderFromUTF8,
    getRawContent
  }
}
