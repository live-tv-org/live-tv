import React from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import Card from 'react-bootstrap/Card';
import styled from 'styled-components'
import { StoreContext } from '../stores/context'
import { withStoreContext } from '../utils/hoc'

const WIDTH = 200
const HEIGHT = 200

@observer
class Game extends React.Component {
  render () {
    console.info('render Game')

    const { game, viewStore } = this.props
    const { name, getBoxArtUrl } = game

    const style = { width: '200px', cursor: 'pointer' }

    const isChecked = viewStore.isCheckedGame(game)

    return (
      <Card border={isChecked ? 'primary' : ''} style={style} as='label' className='mb-3 mr-auto ml-auto'>
        <Preview src={getBoxArtUrl(WIDTH, HEIGHT)} alt={name} variant='top' />
        <Card.Body>
          <Card.Title className='text-truncate'>
            <input type='checkbox' onChange={this.onCheck} checked={isChecked} className='mr-1' />
            {name}
          </Card.Title>
        </Card.Body>
      </Card>
    )
  }

  @action onCheck = (e) => {
    const { game, viewStore } = this.props
    e.target.checked ? viewStore.checkGame(game) : viewStore.uncheckGame(game)
  }
}

const Preview = styled(Card.Img)`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
`

export default withStoreContext(StoreContext)(Game)
