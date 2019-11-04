import { observable, flow } from 'mobx'
import { urlParamsStringify } from '../utils'
import api from '../utils/api'
import Loader from './Loader'

class Users {
  @observable users = []

  constructor () {
    this.loader = new Loader()
  }

  fetch = flow(function* (params) {
    const { loader } = this

    loader.create()
    try {
      this.users = yield api.fetch(`https://api.twitch.tv/helix/users?${urlParamsStringify(params)}`)
      loader.completed()
      return this.users
    } catch (e) {
      loader.failed(e)
    }
  })
}

export default Users
