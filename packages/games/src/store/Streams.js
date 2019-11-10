import uniqBy from 'lodash/uniqBy'
import { flow, observable, computed } from 'mobx'
import api from '../utils/api'
import { urlParamsStringify } from '../utils'
import Loader from './Loader'

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

      if (!options.reset) {
        data = uniqBy([...this.streams, ...data], 'id')
      }

      this.streams = data

      if (pagination.cursor) {
        this.streamsPagination = pagination
      }

      loader.completed()
    } catch (e) {
      loader.failed(e)
    }
  })

  @computed get maxViewer () {
    return this.streams[0]
  }

  percentToMax (viewer) {
    return viewer / this.maxViewer.viewerCount
  }
}

export default Streams
