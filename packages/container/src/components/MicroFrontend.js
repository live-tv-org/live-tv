import React, { Component } from 'react'
import mf from '@gaer87/micro-frontends'

class MicroFrontend extends Component {
  constructor(props) {
    super(props)

    const { name, host } = props

    this.mf = mf(name, host)
  }

  componentDidMount() {
    this.mf.bootstrap()
      .then(this.mf.render)
  }

  componentWillUnmount() {
    this.mf.unmount()
  }

  render () {
    const { name } = this.props
    return <div id={name} />
  }
}

export default MicroFrontend
