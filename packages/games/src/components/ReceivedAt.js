import React from 'react'

const ReceivedAt = ({ loader: { receivedAt } }) => {
  return receivedAt ? <small>{`${new Date(receivedAt)}`}</small> : null
}

export default ReceivedAt;
