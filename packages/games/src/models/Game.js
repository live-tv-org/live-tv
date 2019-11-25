export default class Game {
  constructor (store, { id, name, boxArtUrl }) {
    this.store = store

    this.id = id
    this.name = name
    this.boxArtUrl = boxArtUrl
  }

  getBoxArtUrl = (width = 200, height = 200) => {
    return this.boxArtUrl.replace('{width}', width).replace('{height}', height)
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
