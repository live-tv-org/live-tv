import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Games from './components/Games'
import Filter from './components/Filter'
import Streams from './components/Streams'
import Player from './components/Player'

function App() {
  return (
    <>
      <Jumbotron>
        <Games />
      </Jumbotron>
      <Filter />
      <Streams />
      <Player />
    </>
  );
}

export default App
