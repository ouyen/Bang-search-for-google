const pattern = '*://duckduckgo.com/*'
const lookup = {}

// eslint-disable-next-line no-undef
fetch('https://duckduckgo.com/bang.js')
  .then(data => data.json())
  .then(json => {
    json.forEach(entry => {
      lookup[entry.t] = entry.u
    })
  })
  .catch(e => console.error(e))

function redirect (requestDetails) {
  console.log(requestDetails)
  const url = new URL(requestDetails.url)
  const params = new URLSearchParams(url.search)
  const query = params.get('q')
  if (query === null) return { cancel: false }
  const queryArray = query.split(' ')
  let foundMatchingBang = false
  let newSearchURL = ''
  const string = queryArray.filter((word, index) => {
    if (word[0] === '!' && lookup[word.slice(1)] !== undefined && !foundMatchingBang) {
      newSearchURL = lookup[word.slice(1)]
      foundMatchingBang = true
      return false
    }
    if (word === '') {
      return false
    }
    return true
  }).join(' ')

  if (foundMatchingBang) {
    return {
      redirectUrl: newSearchURL.replace('{{{s}}}', string)
    }
  } else {
    return {
      cancel: false
    }
  }
}

// eslint-disable-next-line no-undef
browser.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: [pattern], types: ['main_frame'] },
  ['blocking']
)
