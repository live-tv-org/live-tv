import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import stores from './store'
import { StoreContext } from './store/context'
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

