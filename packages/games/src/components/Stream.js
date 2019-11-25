import React, { Component } from 'react'
import { observer } from 'mobx-react'
import styled  from 'styled-components'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { StoreContext } from '../stores/context'
import { withStoreContext } from '../utils/hoc'

const WIDTH = 210
const HEIGHT = 125

@observer
class Stream extends Component {
  render () {
    console.info('render Stream')

    const { title, getThumbnailUrl, viewerCount, userName, lang, isPopular, maxViewerCount } = this.props.stream

    return (
      <Card onClick={this.onShow} as='li' style={{ cursor: 'pointer' }}>
        <Preview src={getThumbnailUrl(WIDTH, HEIGHT)} alt={title} variant='top' />
        <Card.Body>
          <Card.Title style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{userName} <Badge variant='light'>{lang}</Badge></Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          {isPopular && <Popularity now={viewerCount} max={maxViewerCount} min='0' variant='info' />}
          <small className='text-muted'>Viewers: {viewerCount}</small>
        </Card.Footer>
      </Card>
    )
  }

  onShow = () => this.props.viewStore.playStreamPlaying(this.props.stream)
}

const Preview = styled(Card.Img)`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
`

const Popularity = styled(ProgressBar)`
  height: 4px;
`

export default withStoreContext(StoreContext)(Stream)
