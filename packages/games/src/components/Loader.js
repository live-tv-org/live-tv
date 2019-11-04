import React from 'react'
import { observer } from 'mobx-react'
import Spinner from 'react-bootstrap/Spinner'

const Loader = ({ loader: { pendingRequests } }) => {
  if (pendingRequests) {
    return <Spinner animation="border" variant="primary" />
  }

  return null
}

export default observer(Loader);
