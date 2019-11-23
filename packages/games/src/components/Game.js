import React from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import Card from 'react-bootstrap/Card';
import { StoreContext } from '../store/context'
import { withStoreContext } from '../utils/hoc'

@observer
class Game extends React.Component {
  render () {
    console.info('render Game')

    const { game, viewStore } = this.props
    const { name, boxArtUrl } = game

    const style = { width: '200px', cursor: 'pointer' }

    const picUrl = boxArtUrl.replace('{width}', 200).replace('{height}', 200)

    const isChecked = viewStore.isCheckedGame(game)

    return (
      <Card border={isChecked ? 'primary' : ''} style={style} as='label' className='mb-3 mr-auto ml-auto'>
        <Card.Img src={picUrl} alt={name} variant='top' />
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

export default withStoreContext(StoreContext)(Game)
