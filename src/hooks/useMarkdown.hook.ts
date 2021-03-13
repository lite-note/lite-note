import MarkdownIt from 'markdown-it'
import markdownItClass from '@toycode/markdown-it-class'

const md = new MarkdownIt().use(markdownItClass, {
  h1: ['title', 'is-1'],
  h2: ['subtitle', 'is-2'],
  h3: ['subtitle', 'is-3'],
  h4: ['subtitle', 'is-4'],
  h5: ['subtitle', 'is-5'],
  h6: ['subtitle', 'is-6'],
  table: ['table', 'is-striped', 'is-hoverable', 'is-fullwidth']
})

export const useMarkdown = () => {
  return {
    render: (content: string) =>
      md.render(decodeURIComponent(escape(atob(content))))
  }
}
