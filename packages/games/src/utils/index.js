export const urlParamsStringify = (params) => {
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
