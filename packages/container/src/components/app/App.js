import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Header from '../header'
import Footer from '../footer'
import MicroFrontend from '../MicroFrontend'

const {
  REACT_APP_GAMES_HOST,
  REACT_APP_TWITCH_CLIENT_ID
} = process.env

const App = () => {
  useEffect(() => {
    sessionStorage.getItem('TWITCH_CLIENT_ID') || sessionStorage.setItem('TWITCH_CLIENT_ID', REACT_APP_TWITCH_CLIENT_ID)
  })

  return (
    <>
      <Header />

      <main className='mt-4 mb-4'>
        <Container>
          <MicroFrontend name='games' host={REACT_APP_GAMES_HOST} />
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default App
