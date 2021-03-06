import { observable, computed, action, autorun, toJS } from 'mobx'
import differenceBy from 'lodash/differenceBy'
import intersectionBy from 'lodash/intersectionBy'
import langs from 'langs'
import Game from '../models/Game'
import User from '../models/User'

const MAX_TOP_GAMES = 10
const MAX_TOP_USERS = 10

class View {
  @observable checkedGames = []
  @observable myGames = []
  @observable languages = []
  @observable users = []
  @observable myUsers = []
  @observable playStream = null

  constructor (gamesStore, streamsStore, usersStore) {
    this.gamesStore = gamesStore
    this.streamsStore = streamsStore
    this.usersStore = usersStore

    const name = 'viewStore'
    this.hydrate(name)
    autorun(() => this.persist(name))
  }

  @action changeGames = games => {
    games = games || []
    this.checkedGames = games.map(item => Game.fromJS(this, item))

    const foundGames = intersectionBy(this.gamesStore.games, this.checkedGames, 'id')
    const newCheckedGames = differenceBy(foundGames, this.myGames, 'id')
    this.myGames.unshift(...newCheckedGames)
    this.myGames.splice(MAX_TOP_GAMES, this.myGames.length - MAX_TOP_GAMES)
  }

  @computed get checkedGamesToJS () {
    return this.checkedGames.map(item => item.toJS())
  }

  @computed get myGamesToJS () {
    return this.myGames.map(item => item.toJS())
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

    const newCheckedUsers = differenceBy(this.users, this.myUsers, 'id')
    this.myUsers.unshift(...newCheckedUsers)
    this.myUsers.splice(MAX_TOP_USERS, this.myUsers.length - MAX_TOP_USERS)
  }

  @computed get usersToJS () {
    return this.users.map(item => item.toJS())
  }

  @computed get myUsersToJS () {
    return this.myUsers.map(item => item.toJS())
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
      myGames: this.myGames.map(item => item.toJS()),
      users: this.users.map(item => item.toJS()),
      myUsers: this.myUsers.map(item => item.toJS()),
      languages: toJS(this.languages)
    }

    window.localStorage.setItem(name, JSON.stringify(data))
  }

  @action hydrate (name) {
    try {
      const storage = JSON.parse(window.localStorage.getItem(name))
      this.checkedGames = storage.checkedGames.map(item => Game.fromJS(this, item))
      this.myGames = storage.myGames.map(item => Game.fromJS(this, item))
      this.users = storage.users.map(item => User.fromJS(this, item))
      this.myUsers = storage.myUsers.map(item => User.fromJS(this, item))
      this.languages = storage.languages || []
    } catch (e) {}
  }
}

export default View
