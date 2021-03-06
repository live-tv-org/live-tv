import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Select from 'react-select'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AsyncSelect from 'react-select/async'
import { StoreContext } from '../stores/context'
import { withStoreContext } from '../utils/hoc'

@observer
class Filter extends Component {
  componentDidMount() {
    this.props.viewStore.fetchStreams({ reset: true })
  }

  render () {
    console.info('render Filter')

    const { streamsStore, viewStore } = this.props
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
              value={viewStore.checkedGamesToJS}
              defaultOptions={viewStore.myGamesToJS}
              onChange={viewStore.changeGames}
              cacheOptions
              loadOptions={this.findGame}
            />
          </Col>
          <Col md='3'>
            <Select className='mb-3'
              isMulti
              placeholder='Select langs...'
              isDisabled={pendingRequests}
              value={viewStore.langToJS}
              options={viewStore.lang}
              getOptionValue={(item) => item[1]}
              getOptionLabel={({ local }) => local}
              onChange={viewStore.changeLang}
            />
          </Col>
          <Col md='3'>
            <AsyncSelect className='mb-3'
              isMulti
              placeholder='Find users...'
              isDisabled={pendingRequests}
              getOptionValue={({ id }) => id}
              getOptionLabel={({ displayName }) => displayName}
              value={viewStore.usersToJS}
              defaultOptions={viewStore.myUsersToJS}
              onChange={viewStore.changeUsers}
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

  findGame = inputValue => new Promise(res => {
    this.props.gamesStore.fetch({ name: inputValue }).then(d => res(d))
  })

  findUser = inputValue => new Promise(res => {
    this.props.usersStore.fetch({ login: inputValue }).then(d => res(d))
  })

  onSubmit = e => {
    e.preventDefault()
    this.props.viewStore.fetchStreams({ reset: true })
  }
}

export default withStoreContext(StoreContext)(Filter)
