import GamesStore from './Games'
import StreamsStore from './Streams'
import UsersStore from './Users'
import ViewStore from './View'
import api from '../api'

const gamesStore = new GamesStore(api.games)
const streamsStore = new StreamsStore(api.streams)
const usersStore = new UsersStore(api.users)
const viewStore = new ViewStore(gamesStore, streamsStore, usersStore)

const stores = {
  gamesStore,
  streamsStore,
  usersStore,
  viewStore
}

export default stores
