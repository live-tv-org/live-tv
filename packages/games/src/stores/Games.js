import { observable, flow } from 'mobx'
import Loader from './Loader'
import Game from '../models/Game'

class Games {
  @observable games = []
  @observable topGames = []

  constructor (transportLayer) {
    this.transportLayer = transportLayer
    this.loader = new Loader()
    this.loaderTop = new Loader()
  }

  fetch = flow(function* (params) {
    const { loader, transportLayer } = this

    loader.create()
    try {
      const { data } = yield transportLayer.all(params)
      
      if (!data.length) return loader.completed()
      
      const games = data.map(item => Game.fromJS(this, item))
      this.games.unshift(...games)
      loader.completed()
      return this.games
    } catch (e) {
      loader.failed(e)
    }
  })

  fetchTop = flow(function* () {
    const { loaderTop, transportLayer } = this

    loaderTop.create()
    try {
      const { data } = yield transportLayer.top()
      this.topGames = data.map(item => Game.fromJS(this, item))
      loaderTop.completed()
    } catch (e) {
      loaderTop.failed(e)
    }
  })
}

export default Games
