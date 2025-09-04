/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable semi */

// {
//   "serpEntries": [
//     {
//       "url": "http://webchiclayo.com/",
//       "title": "Diseño Web Chiclayo – Diseño de Páginas Web en Chiclayo",
//       "domain": "webchiclayo.com",
//       "position": 1,
//       "type": "organic",
//       "clicks": -1,
//       "domainAuthority": 7,
//       "facebookShares": "",
//       "pinterestShares": "",
//       "redditShares": ""
//     },
//  ]
// }

interface GredichResult {
  url: string
  title: string
  domain: string
  position: number
  type: string
  clicks: number
  domainAuthority: number
  facebookShares: string
  pinterestShares: string
  redditShares: string
}

const gredich: ScraperSettings = {
  id: 'gredich',
  name: 'Gredich',
  website: 'gredich.com',
  scrapeURL: (keyword, settings, countryData) => {
    const country = keyword.country || 'US'
    const device = keyword.device === 'mobile' ? '&mobile=true' : ''
    const lang = countryData[country][2]
    // const url = encodeURI(
    //   `https://www.google.com/search?num=100&hl=${lang}&q=${keyword.keyword}`
    // )
    return `https://n8n.gredich.com/webhook/f75eb3d3-4cec-4f95-be76-ef219a40fa0d?keyword=${keyword.keyword}&country=${country}&device=${keyword.device}&lang=${lang}`
    // return `https://api.scrapingrobot.com/?token=${settings.scaping_api}&proxyCountry=${country}&render=false${device}&url=${url}`
  },
  resultObjectKey: 'serpEntries',
  serpExtractor: (content) => {
    console.log('Content:', content)
    const extractedResult: {
      url: string
      title: string
      position: number
    }[] = []
    console.log('Extracted results:', extractedResult)
    const result: GredichResult[] =
      typeof content === 'string'
        ? JSON.parse(content)
        : (content as GredichResult[])
    console.log('Result:', result)
    // const { serpEntries } = result
    // console.log('Serp Entries:', serpEntries)

    for (const { url, title, position } of result) {
      if (title && url) {
        extractedResult.push({
          title,
          url,
          position,
        })
      }
    }
    return extractedResult
  },
}

export default gredich
