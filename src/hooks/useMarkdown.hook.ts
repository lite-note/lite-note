import MarkdownIt from 'markdown-it'
import markdownItClass from '@toycode/markdown-it-class'

const md = new MarkdownIt().use(markdownItClass, {
  h1: ['title', 'is-1'],
  h2: ['title', 'is-2'],
  h3: ['title', 'is-3'],
  h4: ['title', 'is-4'],
  h5: ['title', 'is-5'],
  h6: ['title', 'is-6'],
  table: ['table', 'is-striped', 'is-hoverable', 'is-fullwidth']
})

export const useMarkdown = () => {
  return {
    renderString: (content: string) => md.render(content),
    render: (content: string) =>
      md.render(decodeURIComponent(escape(atob(content))))
  }
}
