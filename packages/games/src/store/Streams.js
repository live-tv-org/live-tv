import { flow, observable, computed } from 'mobx'
import api from '../utils/api'
import { urlParamsStringify } from '../utils'
import Loader from './Loader'

class Streams {
  @observable streams = []

  constructor () {
    this.loader = new Loader()
  }

  fetch = flow(function* (params) {
    const { loader } = this

    loader.create()
    try {
      this.streams = yield api.fetch(`https://api.twitch.tv/helix/streams?${urlParamsStringify(params)}`)
      loader.completed()
    } catch (e) {
      loader.failed(e)
    }
  })

  @computed get maxViewer () {
    return this.streams[0]
  }
}

export default Streams
