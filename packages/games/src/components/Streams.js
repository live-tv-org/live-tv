import React, { Component } from 'react'
import { observer } from 'mobx-react'
import styled  from 'styled-components'
import { StoreContext } from '../store/context'
import { withStoreContext } from '../utils/hoc'
import Loader from './Loader'
import Stream from './Stream'

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

@observer
class Streams extends Component {
  render () {
    console.info('render Streams');

    const { streamsStore } = this.props

    if (streamsStore.loader.pendingRequests) {
      return <Loader loader={streamsStore.loader}/>
    }

    if (!streamsStore.streams.length) {
      return <i>The empty list.</i>
    }

    return (
      <List>{streamsStore.streams.map(stream => <Stream key={stream.id} stream={stream} />)}</List>
    )
  }
}

export default withStoreContext(StoreContext)(Streams)
