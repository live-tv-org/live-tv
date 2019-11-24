import { observable, computed, action, autorun, toJS } from 'mobx'
import langs from 'langs'
import Game from '../models/Game'
import User from '../models/User'

class View {
  @observable checkedGames = []
  @observable languages = []
  @observable users = []
  @observable playStream = null
  languagesDict = langs.all()

  constructor (name, gamesStore, streamsStore, usersStore) {
    this.gamesStore = gamesStore
    this.streamsStore = streamsStore
    this.usersStore = usersStore

    this.hydrate(name)
    autorun(() => this.persist(name))
  }

  @action checkGame (game) {
    this.checkedGames.push(game)
  }

  @action uncheckGame (game) {
    const i = this.findCheckedGameIndex(game)
    i !== -1 && this.checkedGames.splice(i, 1)
  }

  findCheckedGameIndex (game) {
    return this.checkedGames.findIndex(item => item.id === game.id)
  }

  isCheckedGame (game) {
    return this.findCheckedGameIndex(game) > -1
  }

  @computed get isStreamPlaying () {
    return !!this.playStream
  }

  @action stopStreamPlaying = () => {
    this.playStream = null
  }

  @action playStreamPlaying ({ userName }) {
    this.playStream = userName
  }

  @computed get filterParams () {
    const params = {}

    if (this.checkedGames.length) {
      params.game_id = this.checkedGames.map(({ id }) => id)
    }

    if (this.languages.length) {
      params.language = this.languages.map((item) => item[1])
    }

    if (this.users.length) {
      params.user_id = this.users.map(({ id }) => id)
    }

    return params
  }

  fetchStreams = (...args) => this.streamsStore.fetch(this.filterParams, ...args)

  persist (name) {
    const data = {
      checkedGames: this.checkedGames.map(item => item.toJS()),
      languages: toJS(this.languages),
      users: this.users.map(item => item.toJS()),
    }

    window.localStorage.setItem(name, JSON.stringify(data))
  }

  @action hydrate (name) {
    try {
      const viewStore = JSON.parse(window.localStorage.getItem(name))
      this.checkedGames = viewStore.checkedGames.map(item => Game.fromJS(this, item))
      this.languages = viewStore.languages || []
      this.users = viewStore.users.map(item => User.fromJS(this, item))
    } catch (e) {}
  }
}

export default View
