import { observable, flow, computed } from 'mobx'
import Loader from './Loader'
import User from '../models/User'

class Users {
  @observable users = []

  constructor (transportLayer) {
    this.transportLayer = transportLayer
    this.loader = new Loader()
  }

  fetch = flow(function* (params) {
    const { loader, transportLayer } = this

    loader.create()
    try {
      const { data } = yield transportLayer.all(params)
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
