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
      const { data } = yield api.fetch(`https://api.twitch.tv/helix/games?${urlParamsStringify(params)}`)
      this.games = data
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
      const { data } = yield api.fetch('https://api.twitch.tv/helix/games/top')
      this.topGames = data
      loaderTop.completed()
    } catch (e) {
      loaderTop.failed(e)
    }
  })
}

export default Games
