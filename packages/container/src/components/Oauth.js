import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Oauth = ({ children, doc, clientId, url, redirectURI, scope, responseType }) => {
  const [ isLogged, setIsLogged ] = useState(false)

  useEffect(() => {
    const { location } = doc
    const { hash } = location

    const params = new URLSearchParams(`?${hash.substr(1)}`)
    const token = params.get('access_token')

    if (token) {
      sessionStorage.setItem('token', token)

      const url = location.href.split(hash)[0]
      return location.replace(url)
    }

    if (sessionStorage.getItem('token')) {
      return setIsLogged(true)
    }
  }, [ doc ])

  const tokenUrl = `${url}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}`

  return isLogged ? children : <a href={tokenUrl}>Log in</a>
}

Oauth.propTypes = {
  url: PropTypes.string.isRequired,
  redirectURI: PropTypes.string.isRequired,
  scope: PropTypes.string,
  responseType: PropTypes.string,
  doc: PropTypes.object.isRequired
}

Oauth.defaultProps = {
  url: 'https://id.twitch.tv/oauth2/authorize',
  redirectURI: `${window.location.origin}/`,
  scope: '',
  responseType: 'token',
  doc: window.document
}

export default Oauth
