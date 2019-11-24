import GamesStore from './Games'
import StreamsStore from './Streams'
import UsersStore from './Users'
import ViewStore from './View'

const gamesStore = new GamesStore()
const streamsStore = new StreamsStore()
const usersStore = new UsersStore()
const viewStore = new ViewStore('viewStore', gamesStore, streamsStore, usersStore)

const stores = {
  gamesStore,
  streamsStore,
  usersStore,
  viewStore
}

export default stores
