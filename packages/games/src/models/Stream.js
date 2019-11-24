import { computed } from 'mobx'
import langs from 'langs'

export default class Stream {
  constructor (store, { id, gameId, language, thumbnailUrl, title, userId, userName, viewerCount }) {
    this.store = store

    this.id = id
    this.gameId = gameId
    this.language = language
    this.thumbnailUrl = thumbnailUrl
    this.title = title
    this.userId = userId
    this.userName = userName
    this.viewerCount = viewerCount
  }

  @computed get thumbnailUrlDim() {
    return this.thumbnailUrl.replace('{width}', 210).replace('{height}', 125)
  }

  @computed get isPopular() {
    return this.viewerCount / this.maxViewerCount > 0.025
  }

  @computed get maxViewerCount() {
    return this.store.maxViewer.viewerCount
  }

  @computed get lang() {
    return langs.where('1', this.language).local
  }

  toJS() {
    return {
      id: this.id,
      gameId: this.gameId,
      language: this.language,
      thumbnailUrl: this.thumbnailUrl,
      title: this.title,
      userId: this.userId,
      userName: this.userName,
      viewerCount: this.viewerCount
    }
  }

  static fromJS(store, attrs) {
    return new Stream(store, attrs)
  }
}
