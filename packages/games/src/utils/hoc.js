import React from 'react'

export const withStoreContext = StoreContext => WrappedComponent => {
  class WithStoreContext extends React.Component {
    render () {
      return (
        <StoreContext.Consumer>{
          store => <WrappedComponent {...store} {...this.props} />
        }</StoreContext.Consumer>
      )
    }
  }

  WithStoreContext.displayName = `withStoreContext(${getDisplayName(WrappedComponent)})`

  return WithStoreContext
}

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component'
