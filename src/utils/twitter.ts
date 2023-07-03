// @ts-nocheck

// https://github.com/rlidwka/markdown-it-regexp
/* 
const texte = "@[tweet](21345)";
const regex = /@\[tweet]\((.*?)\)/;
const resultat = regex.exec(texte)[1];
console.log(resultat);
*/

window.twttr = (function (d, s, id) {
  let js,
    fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {}

  if (d.getElementById(id)) {
    return t
  }

  js = d.createElement(s)
  js.id = id
  js.src = 'https://platform.twitter.com/widgets.js'
  fjs.parentNode.insertBefore(js, fjs)

  t._e = []
  t.ready = (f) => {
    t._e.push(f)
  }

  return t
})(document, 'script', 'twitter-lite-note')

export const createTweet = (
  tweetId: string,
  theme: 'light' | 'dark' = 'light'
) => {
  window.twttr.ready(() => {
    window.twttr.widgets.createTweet(
      tweetId,
      document.getElementById(`tweet-${tweetId}`, { theme })
    )
  })
}
