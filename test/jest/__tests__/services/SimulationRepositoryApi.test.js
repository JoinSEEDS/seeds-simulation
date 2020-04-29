/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
import SimulationRepositoryApi from '../../../../src/services/SimulationRepositoryApi'

jest.setTimeout(10000)

process.env = {
  WEBSERVICES_URL: 'https://fqbkgjgig0.execute-api.eu-west-1.amazonaws.com/dev',
  WEBSERVICES_API_KEY: 'Zo3L4h85H4TxltCRRrJR70SIfVSWQJW15MbwsTzg'
}

let repositoryApi = new SimulationRepositoryApi()

describe('Test save', () => {
  test('save', async () => {
    try {
      let simulation = await repositoryApi.save({
        account: 'testaccount',
        name: `Test Sim: ${Date.now()}`,
        description: 'Test simulation',
        data: {
          str: 'Test Simulation',
          num: 12312.232
        }
      })
      console.log('Simulation: ', simulation)
    } catch (error) {
      console.log(error)
      throw error
    }
  })
})

describe('Test delete', () => {
  test('delete', async () => {
    try {
      let simulation = await repositoryApi.save({
        account: 'testaccount',
        name: `Test Sim: ${Date.now()}`,
        description: 'Test simulation',
        data: {
          str: 'Test Simulation',
          num: 12312.232
        }
      })
      console.log('Simulation: ', simulation)
      await repositoryApi.delete({
        id: simulation.id,
        account: simulation.creatorAccount
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  })
})

describe('Test search', () => {
  test('search', async () => {
    try {
      let response = await repositoryApi.search({
        account: 'testaccount',
        term: 'sim'
      })
      console.log('Search Response: ', response)
    } catch (error) {
      console.log(error)
      throw error
    }
  })
  test('search none', async () => {
    try {
      let response = await repositoryApi.search({
        account: 'testaccount',
        term: 'asdas'
      })
      console.log('Search Response: ', response)
      expect(response).toEqual({
        rows: [],
        more: false
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  })
})

describe('Test wake db', () => {
  test('wakedb', async () => {
    try {
      let response = await repositoryApi.wakeDb()
      expect(response).toHaveProperty('wasAwake')
      console.log('Wake Response: ', response)
    } catch (error) {
      console.log(error)
      throw error
    }
  })
})
