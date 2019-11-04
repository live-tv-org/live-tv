import camelCase from 'camelcase'

const camelCaseObj = item => {
  return Object.keys(item).reduce((memo, attr) => {
    memo[camelCase(attr)] = item[attr]
    return memo
  }, {})
}

const _fetch = (url, opt = {}) => {
  const clientId = sessionStorage.getItem('TWITCH_CLIENT_ID')
  // const token = sessionStorage.getItem('token')

  return fetch(url, {
    ...opt,
    headers: {
      ...opt.headers,
      'Client-ID': clientId
      // 'Authorization': `Bearer ${token}`
    },
  })
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Server an error')
        }
        return resp.json()
      })
    .then(payload => (payload.data || payload))
    .then(data => {
      if (Array.isArray(data)) {
        return data.map(camelCaseObj)
      }

      return camelCaseObj(data)
    })
}

export default { fetch: _fetch }
