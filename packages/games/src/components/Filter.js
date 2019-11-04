import React, { Component } from 'react'
import { observable, action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import Select from 'react-select'
import langs from 'langs'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AsyncSelect from 'react-select/async'
import { StoreContext } from '../store/context'
import { withStoreContext } from '../utils/hoc'

@observer
class Filter extends Component {
  languagesDict = langs.all()

  @observable languages = []

  @observable users = []

  componentDidMount() {
    const { streamsStore } = this.props
    streamsStore.fetch({})
  }

  render () {
    const { gamesStore, streamsStore, viewStore } = this.props
    const { pendingRequests } = streamsStore.loader

    console.info('render Filter')

    return (
      <Form onSubmit={this.onSubmit} className='mb-3'>
        <Form.Row>
          <Col md='4'>
            <AsyncSelect
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
            <Select
              isMulti
              placeholder='Select langs...'
              isDisabled={pendingRequests}
              options={this.languagesDict}
              getOptionValue={(item) => item[1]}
              getOptionLabel={({ local }) => local}
              onChange={this.onChangeLang}
            />
          </Col>
          <Col md='3'>
            <AsyncSelect
              isMulti
              placeholder='Find users...'
              isDisabled={pendingRequests}
              getOptionValue={({ id }) => id}
              getOptionLabel={({ displayName }) => displayName}
              onChange={this.onChangeUser}
              cacheOptions
              loadOptions={this.findUser}
            />
          </Col>
          <Col md='2'>
            <Button block type='submit' variant='primary' disabled={pendingRequests}>Go!</Button>
          </Col>
        </Form.Row>
      </Form>
    )
  }

  findGame = inputValue => new Promise(resolve => {
    this.props.gamesStore.fetch({ name: inputValue }).then(resolve)
  })

  @action onChangeGame = selectedOption => {
    this.props.viewStore.checkedGames = selectedOption || []
  }

  @action onChangeLang = selectedOption => {
    this.languages = selectedOption || []
  }

  findUser = inputValue => new Promise(resolve => {
    this.props.usersStore.fetch({ login: inputValue }).then(resolve)
  })

  @action onChangeUser = selectedOption => {
    this.users = selectedOption || []
  }

  onSubmit = e => {
    e.preventDefault()

    const { streamsStore, viewStore } = this.props

    const params = {}

    if (viewStore.checkedGames.length) {
      params.game_id = viewStore.checkedGames.map(({ id }) => id)
    }

    if (this.languages.length) {
      params.language = this.languages.map((item) => item[1])
    }

    if (this.users.length) {
      params.user_id = this.users.map(({ id }) => id)
    }

    streamsStore.fetch(params)
  }
}

export default withStoreContext(StoreContext)(Filter)
