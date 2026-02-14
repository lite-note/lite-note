// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
window.twttr = (function (d, s, id) {
  const fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {}

  if (d.getElementById(id)) {
    return t
  }

  const js = d.createElement(s)
  js.id = id
  js.src = "https://platform.twitter.com/widgets.js"
  fjs.parentNode.insertBefore(js, fjs)

  t._e = []
  t.ready = (f) => {
    t._e.push(f)
  }

  return t
})(document, "script", "twitter-remanso")

export const createTweet = (
  tweetId: string,
  theme: "light" | "dark" = "light",
) => {
  window.twttr.ready(() => {
    window.twttr.widgets.createTweet(
      tweetId,
      document.getElementById(`tweet-${tweetId}`, { theme }),
    )
  })
}

export const generateTweets = () => {
  const elements = document.querySelectorAll(".markdown-tweet")

  elements.forEach((element) => {
    createTweet(element.dataset.tweetId)
  })
}
