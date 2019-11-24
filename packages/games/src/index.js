import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import stores from './stores'
import { StoreContext } from './stores/context'
import App from './App'

console.info('GAMES bootstrap')

configure({ enforceActions: 'always' })

window.gamesRender = (container) => {
  console.info('gamesRender', container)
  ReactDOM.render((
    <StoreContext.Provider value={stores}>
      <App />
    </StoreContext.Provider>
  ), container)
}

window.gamesUnmount = () => {
  console.info('gamesUnmount')
}

