export default class User {
  constructor (store, { id, login, displayName }) {
    this.store = store

    this.id = id
    this.login = login
    this.displayName = displayName
  }

  toJS() {
    return {
      id: this.id,
      login: this.login,
      displayName: this.displayName
    }
  }

  static fromJS(store, attrs) {
    return new User(store, attrs)
  }
}
