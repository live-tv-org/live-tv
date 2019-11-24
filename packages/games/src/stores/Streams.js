import { flow, observable, computed } from 'mobx'
import api from '../utils/api'
import { urlParamsStringify } from '../utils'
import Loader from './Loader'
import Stream from '../models/Stream'

class Streams {
  @observable streams = []

  constructor () {
    this.loader = new Loader()
  }

  fetch = flow(function* (params, options = {}) {
    const { loader } = this

    loader.create()
    try {
      if (options.reset) {
        this.streamsPagination = null
      }

      if (this.streamsPagination) {
        params.after = this.streamsPagination.cursor
      }

      let { data, pagination } = yield api.fetch(`https://api.twitch.tv/helix/streams?${urlParamsStringify(params)}`)

      data = data.map(item => Stream.fromJS(this, item))

      if (options.reset) {
        this.streams = data
      } else {
        this.streams.push(...data.filter(this.isUnic))
      }

      if (pagination.cursor) {
        this.streamsPagination = pagination
      }

      loader.completed()
    } catch (e) {
      loader.failed(e)
    }
  })

  @computed get ids() {
    return this.streams.map(item => item.id)
  }

  isUnic = item => !this.ids.includes(item.id)

  @computed get maxViewer () {
    return this.streams[0]
  }
}

export default Streams
