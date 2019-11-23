import React, { Component } from 'react'
import { action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import Select from 'react-select'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AsyncSelect from 'react-select/async'
import { StoreContext } from '../store/context'
import { withStoreContext } from '../utils/hoc'

@observer
class Filter extends Component {
  componentDidMount() {
    this.fetch()
  }

  render () {
    console.info('render Filter')

    const { gamesStore, streamsStore, viewStore } = this.props
    const { pendingRequests } = streamsStore.loader

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Row>
          <Col md='4'>
            <AsyncSelect className='mb-3'
              isMulti
              placeholder='Find games...'
              isDisabled={pendingRequests}
              getOptionValue={({ id }) => id}
              getOptionLabel={({ name }) => name}
              onChange={this.onChangeGame}
              cacheOptions
              value={toJS(viewStore.checkedGames)}
              defaultOptions={gamesStore.topGames}
              loadOptions={this.findGame}
            />
          </Col>
          <Col md='3'>
            <Select className='mb-3'
              isMulti
              placeholder='Select langs...'
              isDisabled={pendingRequests}
              value={toJS(viewStore.languages)}
              options={viewStore.languagesDict}
              getOptionValue={(item) => item[1]}
              getOptionLabel={({ local }) => local}
              onChange={this.onChangeLang}
            />
          </Col>
          <Col md='3'>
            <AsyncSelect className='mb-3'
              isMulti
              placeholder='Find users...'
              isDisabled={pendingRequests}
              getOptionValue={({ id }) => id}
              getOptionLabel={({ displayName }) => displayName}
              value={toJS(viewStore.users)}
              onChange={this.onChangeUser}
              cacheOptions
              loadOptions={this.findUser}
            />
          </Col>
          <Col md='2'>
            <Button className='mb-3' block type='submit' variant='primary' disabled={pendingRequests}>
              {pendingRequests
                ? 'Loading…'
                : 'Go!'
              }
            </Button>
          </Col>
        </Form.Row>
      </Form>
    )
  }

  @action onChangeGame = selected => this.props.viewStore.checkedGames = selected || []

  @action onChangeLang = selected => this.props.viewStore.languages = selected || []

  @action onChangeUser = selected => this.props.viewStore.users = selected || []

  @action findGame = inputValue => new Promise(resolve => {
    this.props.gamesStore.fetch({ name: inputValue }).then(resolve)
  })

  @action findUser = inputValue => new Promise(resolve => {
    this.props.usersStore.fetch({ login: inputValue }).then(resolve)
  })

  onSubmit = e => {
    e.preventDefault()
    this.fetch()
  }

  fetch = () => this.props.viewStore.fetchStreams({ reset: true })
}

export default withStoreContext(StoreContext)(Filter)
