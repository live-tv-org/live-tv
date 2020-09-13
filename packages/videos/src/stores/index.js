import api from '../api'
import VideosStore from './Videos'

const videosStore = new VideosStore(api.videos)

const stores = {
  videosStore
}

export default stores
