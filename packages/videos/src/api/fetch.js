import camelCase from 'camelcase'

const _fetch = (url, { data, headers, ...opt } = {}) => {
  const apiKey = sessionStorage.getItem('YOUTUBE_API_KEY')
  // const token = sessionStorage.getItem('token')

  data.key = apiKey

  if (data) {
    url = `${url}?${urlParamsStringify(data)}`
  }

  return fetch(url, {
    ...opt,
    headers: {
      ...headers,
      // 'Client-ID': clientId
      // 'Authorization': `Bearer ${token}`
    },
  })
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Server an error')
      }
      return resp.json()
    })
    .then(({ items, ...other }) => {
      if (Array.isArray(items)) {
        return { data: items.map(camelCaseObj), ...other }
      }

      return { data: camelCaseObj(items), ...other }
    })
}

const urlParamsStringify = (params = []) => {
  return Object.keys(params).reduce((memo, key) => {
    const value = params[key]

    if (Array.isArray(value) && value.length) {
      value.forEach(v => v && memo.append(key, v))
      return memo
    }

    value && memo.append(key, value)
    return memo
  }, new URLSearchParams())
}

const camelCaseObj = item => {
  return Object.keys(item).reduce((memo, attr) => {
    memo[camelCase(attr)] = item[attr]
    return memo
  }, {})
}

export default { fetch: _fetch }
