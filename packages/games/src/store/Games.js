import { observable, flow } from 'mobx'
import { urlParamsStringify } from '../utils'
import api from '../utils/api'
import Loader from './Loader'

class Games {
  @observable games = []
  @observable topGames = []

  constructor () {
    this.loader = new Loader()
    this.loaderTop = new Loader()
  }

  fetch = flow(function* (params) {
    const { loader } = this

    loader.create()
    try {
      this.games = yield api.fetch(`https://api.twitch.tv/helix/games?${urlParamsStringify(params)}`)
      loader.completed()
      return this.games
    } catch (e) {
      loader.failed(e)
    }
  })

  fetchTop = flow(function* () {
    const { loaderTop } = this

    loaderTop.create()
    try {
      this.topGames = yield api.fetch('https://api.twitch.tv/helix/games/top')
      loaderTop.completed()
    } catch (e) {
      loaderTop.failed(e)
    }
  })
}

export default Games
