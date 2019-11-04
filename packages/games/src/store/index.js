import GamesStore from './Games'
import StreamsStore from './Streams'
import UsersStore from './Users'
import ViewStore from './View'

const stores = {
  viewStore: new ViewStore(),
  gamesStore: new GamesStore(),
  streamsStore: new StreamsStore(),
  usersStore: new UsersStore()
}

export default stores
