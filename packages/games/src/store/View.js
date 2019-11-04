import { observable, computed, action } from 'mobx'

class View {
  @observable checkedGames = []

  @action checkGame (game) {
    this.checkedGames.push(game)
  }

  @action uncheckGame (game) {
    const i = this.findIndex(game)
    i !== -1 && this.checkedGames.splice(i, 1)
  }

  findIndex (game) {
    return this.checkedGames.findIndex(item => item.id === game.id)
  }

  isChecked (game) {
    return this.findIndex(game) > -1
  }

  @observable playGame = null

  @computed get isGamePlaying () {
    return !!this.playGame
  }

  @action stopGamePlaying () {
    this.playGame = null
  }

  @action playGamePlaying (id) {
    this.playGame = id
  }
}

export default View
