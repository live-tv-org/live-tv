import { computed } from 'mobx'

export default class Game {
  constructor (store, { id, name, boxArtUrl }) {
    this.store = store

    this.id = id
    this.name = name
    this.boxArtUrl = boxArtUrl
  }

  @computed get boxArtUrlDim() {
    return this.boxArtUrl.replace('{width}', 200).replace('{height}', 200)
  }

  toJS() {
    return {
      id: this.id,
      name: this.name,
      boxArtUrl: this.boxArtUrl
    }
  }

  static fromJS(store, attrs) {
    return new Game(store, attrs)
  }
}
