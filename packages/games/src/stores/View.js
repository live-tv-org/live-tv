import { observable, computed, action, autorun, toJS } from 'mobx'
import differenceBy from 'lodash/differenceBy'
import langs from 'langs'
import Game from '../models/Game'
import User from '../models/User'

class View {
  @observable checkedGames = []
  @observable languages = []
  @observable users = []
  @observable playStream = null

  constructor (name, gamesStore, streamsStore, usersStore) {
    this.gamesStore = gamesStore
    this.streamsStore = streamsStore
    this.usersStore = usersStore

    this.hydrate(name)
    autorun(() => this.persist(name))
  }

  @action changeGames = (games) => {
    games = games || []
    this.checkedGames = games.map(item => Game.fromJS(this, item))
  }

  @computed get checkedGamesToJS () {
    return this.checkedGames.map(item => item.toJS())
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

  @action changeUsers = (users) => {
    users = users || []
    this.users = users.map(item => User.fromJS(this, item))
  }

  @computed get usersToJS () {
    return this.users.map(item => item.toJS())
  }

  @action changeLang = (lang) => {
    lang = lang || []
    this.languages = lang
  }

  @computed get langToJS () {
    return toJS(this.languages)
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

  get lang () {
    const all = langs.all()

    const top = [
      langs.where('1', 'en'),
      langs.where('1', 'ru'),
      langs.where('1', 'de'),
      langs.where('1', 'es'),
      langs.where('1', 'fr'),
      langs.where('1', 'ja'),
      langs.where('1', 'pt'),
      langs.where('1', 'it'),
      langs.where('1', 'fa'),
      langs.where('1', 'pl'),
      langs.where('1', 'zh')
    ]

    const other = differenceBy(all, top, '1')

    return top.concat(other)
  }

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
      const storage = JSON.parse(window.localStorage.getItem(name))
      this.checkedGames = storage.checkedGames.map(item => Game.fromJS(this, item))
      this.languages = storage.languages || []
      this.users = storage.users.map(item => User.fromJS(this, item))
    } catch (e) {}
  }
}

export default View
