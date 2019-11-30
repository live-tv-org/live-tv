import React from 'react'
import Container from 'react-bootstrap/Container';

const Footer = () => (
  <footer className='text-muted'>
    <Container>
      <ul className="list-inline">
        <li className="list-inline-item">&copy; 2019 LiveTV</li>
        <li className="list-inline-item"><a href="mailto:support@live-tv.org">contact us</a></li>
      </ul>
    </Container>
  </footer>
)

export default Footer

