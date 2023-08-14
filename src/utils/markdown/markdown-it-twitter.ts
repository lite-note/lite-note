import { markdownItPlugin } from '@/utils/markdown/markdown-it-regexp'

export const twitterPlugin = markdownItPlugin(
  /@\[tweet]\((.*?)\)/g,
  (matches: RegExpExecArray[]) => {
    const [, tweetId] = matches

    return `<span id="tweet-${tweetId}" data-tweet-id="${tweetId}" class="markdown-tweet"></span>`
  }
)
