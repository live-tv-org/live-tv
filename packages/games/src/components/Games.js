import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import Slider from 'react-slick'
import { StoreContext } from '../stores/context'
import { withStoreContext } from '../utils/hoc'
import Game from './Game'
import Loader from './Loader'

const SETTINGS = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  autoplay: true,
  autoplaySpeed: 5000,
  cssEase: 'ease',
  swipeToSlide: true,
  pauseOnHover: true
}

const Games = ({ gamesStore }) => {
  console.info('render Games')

  useEffect(() => { gamesStore.loaderTop.receivedAt || gamesStore.fetchTop() })

  return (
    <>
      <Loader loader={gamesStore.loaderTop} />
      {gamesStore.loaderTop.receivedAt && (
        <Slider {...SETTINGS}>{gamesStore.topGames.map(game => <Game key={game.id} game={game} />)}</Slider>
      )}
    </>
  )
}

export default withStoreContext(StoreContext)(observer(Games))
