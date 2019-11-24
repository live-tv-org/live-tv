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
      const { data } = yield api.fetch(`https://api.twitch.tv/helix/users?${urlParamsStringify(params)}`)
      this.users = data
      loader.completed()
      return this.users
    } catch (e) {
      loader.failed(e)
    }
  })
}

export default Users
