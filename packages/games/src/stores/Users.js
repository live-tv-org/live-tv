import { observable, flow, computed } from 'mobx'
import { urlParamsStringify } from '../utils'
import api from '../utils/api'
import Loader from './Loader'
import User from '../models/User'

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
      this.users = data.map(item => User.fromJS(this, item))
      loader.completed()
      return this.users
    } catch (e) {
      loader.failed(e)
    }
  })

  @computed get toJS () {
    return this.users.map(item => item.toJS())
  }
}

export default Users
