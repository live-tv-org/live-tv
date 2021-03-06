import { observable, flow } from 'mobx'
import Loader from './Loader'
import Game from '../models/Game'

interface GamesInterface {
  games: Game[],
  readonly loader: Loader,
  fetch(params?: object): void,

  topGames: Game[],
  readonly loaderTop: Loader,
  fetchTop(): void
}

class Games implements GamesInterface {
  @observable games = []
  @observable topGames = []

  loader
  loaderTop

  constructor (private transportLayer) {
    this.loader = new Loader()
    this.loaderTop = new Loader()
  }

  fetch = flow(function* (params) {
    const { loader, transportLayer } = this

    loader.create()
    try {
      // @ts-ignore
      const { data } = yield transportLayer.all(params)
      this.games = data.map(item => Game.fromJS(this, item))
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
      // @ts-ignore
      const { data } = yield transportLayer.top()
      this.topGames = data.map(item => Game.fromJS(this, item))
      loaderTop.completed()
    } catch (e) {
      loaderTop.failed(e)
    }
  })
}

export default Games
