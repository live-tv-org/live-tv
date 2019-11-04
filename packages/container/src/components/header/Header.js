import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Header = () => (
  <Navbar bg='dark' variant='dark' expand="lg">
    <Container className='App'>
      <Navbar.Brand href='/'>{'\u{1F37F}'} Live TV</Navbar.Brand>
      <Nav className='mr-auto'>
        {/*<Nav.Link href='/games'>Games</Nav.Link>*/}
      </Nav>
    </Container>
  </Navbar>
)

export default Header
