import camelCase from 'camelcase'

const _fetch = (url, { data, headers, ...opt } = {}) => {
  const clientId = sessionStorage.getItem('TWITCH_CLIENT_ID')
  // const token = sessionStorage.getItem('token')

  if (data) {
    url = `${url}?${urlParamsStringify(data)}`
  }

  return fetch(url, {
    ...opt,
    headers: {
      ...headers,
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
    .then(({ data, ...other }) => {
      if (Array.isArray(data)) {
        return { data: data.map(camelCaseObj), ...other }
      }

      return { data: camelCaseObj(data), ...other }
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
