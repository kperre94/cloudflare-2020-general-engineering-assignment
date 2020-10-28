const links = [
  {
    name: 'My linkedIn Profile',
    url: 'https://www.linkedin.com/in/kperre2/'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/home?lang=en'
  },
  {
    name: 'Apple Homepage',
    url: 'https://www.apple.com/'
  }
]

const header = {
  headers: {
    'content-type': 'text/html;charset=UTF-8'
  }
}

const jsonHeader = {
  headers: {
    'content-type': 'application/json;charset=UTF-8'
  }
}

// EVENT LISTENER

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event))
})

  async function handleRequest(e) {
  const url = new URL(e.request.url)
  let element = url.pathname.split('/').filter(n => n)

  if (element[0] == 'links') {
    const json = JSON.stringify(links, null, 2) 
      return new Response(json, jsonHeader)
  } else if (element[0] == undefined) {
    const response = await fetch(
      'https://static-links-page.signalnerve.workers.dev', header
    )

    return new HTMLRewriter()
      .on('div#links', new LinksTransformer())
      .transform(response)
    } else {
      return new Response('Error', {status: '400'})
    }
  }

class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  async element(element) {
    links.forEach(link => {
      element.append(`<a href="${link.url}" target="_blank">${link.name}</a>`, {
        html: true
      })
    })
  }
}