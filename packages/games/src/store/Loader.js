import { observable, action } from 'mobx'

class Loader {
  @observable pendingRequests = 0

  @observable receivedAt = null

  @observable errors = []

  @action
  create () {
    this.pendingRequests++
    this.receivedAt = null
  }

  @action
  completed () {
    this.pendingRequests--
    this.receivedAt = Date.now()
    this.errors = []
  }

  @action
  failed (error) {
    this.pendingRequests--
    this.errors = [error]
  }
}

export default Loader
