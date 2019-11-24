import React, { Component } from 'react'
import { observer } from 'mobx-react'
import styled  from 'styled-components'
import langs from 'langs'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { StoreContext } from '../stores/context'
import { withStoreContext } from '../utils/hoc'

@observer
class Stream extends Component {
  render () {
    console.info('render Stream')

    const {
      streamsStore,
      stream: { title, thumbnailUrl, viewerCount, userName, language }
    } = this.props

    const picUrl = thumbnailUrl.replace('{width}', 210).replace('{height}', 125)

    const lang = langs.where('1', language).local

    return (
      <Card onClick={this.onShow} as='li' style={{ cursor: 'pointer' }}>
        <Card.Img src={picUrl} alt={title} variant='top' />
        <Card.Body>
          <Card.Title style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{userName} <Badge variant='light'>{lang}</Badge></Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          {streamsStore.percentToMax(viewerCount) > 0.025 && (
            <Popularity now={viewerCount} max={streamsStore.maxViewer.viewerCount} min='0' variant='info' />
          )}
          <small className='text-muted'>Viewers: {viewerCount}</small>
        </Card.Footer>
      </Card>
    )
  }

  onShow = () => this.props.viewStore.playStreamPlaying(this.props.stream)
}

const Popularity = styled(ProgressBar)`
  height: 4px;
`

export default withStoreContext(StoreContext)(Stream)
