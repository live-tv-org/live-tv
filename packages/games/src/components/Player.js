import React, { Component, createRef } from 'react'
import { observer } from 'mobx-react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { createGlobalStyle } from 'styled-components'
import { StoreContext } from '../stores/context'
import { withStoreContext } from '../utils/hoc'

const PLAYER_WIDTH = 620

const ModalWidth = createGlobalStyle`
  .modal-player {
    max-width: calc(${PLAYER_WIDTH}px + 2rem + 2px) !important;
    
    iframe {
      display: block;
    }
  } 
`

@observer
class Player extends Component {
  constructor (props) {
    super(props)
    this.playerCont = createRef()
  }

  render () {
    console.info('render Player');

    const { viewStore } = this.props

    return (
      <>
        <ModalWidth />
        <Modal
            show={viewStore.isStreamPlaying}
            onShow={this.togglePlayer}
            onHide={viewStore.stopStreamPlaying}
            dialogClassName='modal-player'>
          <Modal.Body>
            <div ref={this.playerCont} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={viewStore.stopStreamPlaying}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  togglePlayer = () => {
    const options = { width: PLAYER_WIDTH, height: 300, channel: this.props.viewStore.playStream };
    const player = new window.Twitch.Player(this.playerCont.current, options);
    player.setVolume(0.5);
  }
}

export default withStoreContext(StoreContext)(Player)
