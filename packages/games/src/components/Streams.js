import React, { Component } from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import styled  from 'styled-components'
import Button  from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StoreContext } from '../store/context'
import { withStoreContext } from '../utils/hoc'
import Stream from './Stream'

@observer
class Streams extends Component {
  render () {
    console.info('render Streams');

    const { streamsStore } = this.props
    const { pendingRequests } = streamsStore.loader

    if (!streamsStore.streams.length) {
      return <i>The empty list.</i>
    }

    return (
      <>
        <List>{streamsStore.streams.map(stream => <Stream key={stream.id} stream={stream} />)}</List>
        <Row className='justify-content-md-center'>
          <Col md='2'>
            <Button onClick={this.props.viewStore.fetchStreams} variant='secondary' block disabled={pendingRequests}>
              {pendingRequests ? 'Loading…' : 'More'}
            </Button>
          </Col>
        </Row>
      </>
    )
  }
}

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  list-style: none;
  padding: 0;
`

export default withStoreContext(StoreContext)(Streams)
