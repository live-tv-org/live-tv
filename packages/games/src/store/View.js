import { observable, computed, action, autorun, toJS } from 'mobx'

class View {
  @observable checkedGames = []
  @observable languages = []
  @observable users = []
  @observable playGame = null

  constructor (name) {
    this.hydrate(name)
    autorun(() => this.persist(name))
  }

  @action checkGame (game) {
    this.checkedGames.push(game)
  }

  @action uncheckGame (game) {
    const i = this.findIndex(game)
    i !== -1 && this.checkedGames.splice(i, 1)
  }

  findIndex (game) {
    return this.checkedGames.findIndex(item => item.id === game.id)
  }

  isChecked (game) {
    return this.findIndex(game) > -1
  }

  @computed get isGamePlaying () {
    return !!this.playGame
  }

  @action stopGamePlaying () {
    this.playGame = null
  }

  @action playGamePlaying (id) {
    this.playGame = id
  }

  @computed get serializeParams () {
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

  persist (name) {
    const data = {
      checkedGames: toJS(this.checkedGames),
      languages: toJS(this.languages),
      users: toJS(this.users)
    }

    window.localStorage.setItem(name, JSON.stringify(data))
  }

  @action hydrate (name) {
    try {
      const viewStore = JSON.parse(window.localStorage.getItem(name))
      this.checkedGames = viewStore.checkedGames || []
      this.languages = viewStore.languages || []
      this.users = viewStore.users || []
    } catch (e) {}
  }
}

export default View
