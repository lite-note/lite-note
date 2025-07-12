import markdownItClass from "@toycode/markdown-it-class"
import markdownItLatex from "@vscode/markdown-it-katex"
import MarkdownIt, { Options, Renderer, Token } from "markdown-it"
import blockEmbedPlugin from "markdown-it-block-embed"
import markdownItCheckbox from "markdown-it-checkbox"
import markdownItFootnote from "markdown-it-footnote"
import MarkdownItGitHubAlerts from "markdown-it-github-alerts"
import markdownItIframe from "markdown-it-iframe"
import Shikiji from "markdown-it-shikiji"
import { Ref, toValue } from "vue"

import { decodeBase64ToUTF8 } from "@/utils/decodeBase64ToUTF8"
import { html5Media } from "@/utils/markdown/markdown-html5-media"
import { twitterPlugin } from "@/utils/markdown/markdown-it-twitter"
import mermaid from "mermaid"

const markdownItMermaidExtractor = (md: MarkdownIt) => {
  const defaultFence =
    md.renderer.rules.fence ||
    function (
      tokens: Array<Token>,
      index: number,
      options: Options,
      _: unknown,
      self: Renderer,
    ) {
      return self.renderToken(tokens, index, options)
    }

  md.renderer.rules.fence = function (
    tokens: Array<Token>,
    index: number,
    options: Options,
    env: unknown,
    self: Renderer,
  ) {
    const token = tokens[index]

    if (token.info.trim() === "mermaid") {
      const content = token.content.trim()
      return `<pre class="mermaid">\n${md.utils.escapeHtml(content)}\n</pre>\n`
    }

    return defaultFence(tokens, index, options, env, self)
  }
}

const md = new MarkdownIt({
  typographer: true,
  quotes: ["«\xA0", "\xA0»", "‹\xA0", "\xA0›"],
})
  .use(markdownItClass, {
    h1: ["title", "is-2"],
    h2: ["title", "is-3"],
    h3: ["title", "is-4"],
    h4: ["title", "is-5"],
    h5: ["title", "is-6"],
    h6: ["title", "is-6"],
  })
  .use(markdownItMermaidExtractor)
  .use(html5Media)
  .use(blockEmbedPlugin, {
    youtube: {
      width: "100%",
      height: 300,
    },
  })
  .use(twitterPlugin)
  .use(markdownItCheckbox)
  .use(markdownItFootnote)
  .use(markdownItLatex)
  .use(markdownItIframe, {
    width: "100%",
  })
  .use(MarkdownItGitHubAlerts)

let shikijiInitialized = false

export const useShikiji = async () => {
  if (shikijiInitialized) {
    return
  }

  shikijiInitialized = true
  md.use(
    await Shikiji({
      themes: {
        light: "vitesse-light",
        dark: "vitesse-black",
      },
      langs: [
        "bash",
        "javascript",
        "typescript",
        "markdown",
        "mermaid",
        "html",
        "css",
        "json",
      ],
    }),
  )
}

let mermaidInitialized = false

export const runMermaid = (querySelector: string) => {
  if (!mermaidInitialized) {
    mermaidInitialized = true
    mermaid.initialize({ startOnLoad: false, flowchart: { curve: "natural" } })
  }

  mermaid.run({
    querySelector,
  })
}

const rules: Renderer.RenderRuleRecord = {
  table_open: () =>
    '<div class="overflow-x-auto"><table class="table table-zebra">',
  table_close: () => "</table></div>",
}

md.renderer.rules = { ...md.renderer.rules, ...rules }

export const useMarkdown = (defaultPrefix?: Ref<string> | string) => {
  const getRawContent = (content: string) => decodeBase64ToUTF8(content)
  const renderFromUTF8 = (content: string, prefix?: string) =>
    content
      ? md.render(content, {
          docId: defaultPrefix ? toValue(defaultPrefix) : (prefix ?? ""),
        })
      : ""

  return {
    toHTML: (content: string) => (content ? md.render(content) : ""),
    render: (content: string, prefix?: string) =>
      renderFromUTF8(decodeBase64ToUTF8(content), prefix),
    renderFromUTF8,
    getRawContent,
  }
}
