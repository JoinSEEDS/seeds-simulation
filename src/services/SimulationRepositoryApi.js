import axios from 'axios'

class SimulationRepositoryApi {
  constructor () {
    const {
      WEBSERVICES_URL: baseURL,
      WEBSERVICES_API_KEY: apiKey
    } = process.env
    this.axios = axios.create({
      baseURL,
      headers: {
        'x-api-key': apiKey
      }
    })
  }

  async save ({
    id,
    account,
    name,
    description,
    data
  }) {
    console.log('Saving simulation...')
    const { uploadUrl, key } = await this._getUploadUrl()
    console.log(`uploadUrl: ${uploadUrl} key: ${key}`)
    await this._storeSimulationData(uploadUrl, data)
    const simulation = await this._saveSimulation({
      id,
      account,
      name,
      description,
      s3Key: key
    })

    return simulation
  }

  async delete ({
    id,
    account
  }) {
    console.log('Deleting simulation...')
    return this.axios.post('/delete-simulation', {
      id,
      account
    })
  }

  async wakeDb () {
    console.log('Waking Db Up...')
    const { data } = await this.axios.get('/wake-db')
    return data
  }

  /**
   * Search simulations
   *
   * @param {string} [account] creator account
   * @param {string} [term] to search for in name and description
   * @param {string} [orderBy] name of column to order by
   * @param {boolean} [desc] whether it should be ordered in descending order
   * @param {int} offset 2 decimals
   * @param {int} limit
   * @returns {object} with following structure {more: true, rows: []}
   * @throws {error} incase of error
   */
  async search ({
    account,
    term,
    orderBy,
    desc,
    offset,
    limit
  }) {
    const { data } = await this.axios.post('/search-simulation', {
      creatorAccount: account,
      term,
      orderBy,
      desc,
      offset,
      limit
    })
    return data
  }

  async _saveSimulation ({
    id,
    account,
    name,
    description,
    s3Key
  }) {
    const { data } = await this.axios.post('/save-simulation', {
      id,
      account,
      name,
      description,
      s3Key
    })
    return data
  }

  async _getUploadUrl () {
    const { data } = await this.axios.get('/get-upload-url')
    return data
  }

  async _storeSimulationData (uploadUrl, simulation) {
    return axios.put(uploadUrl, simulation)
  }
}

export default SimulationRepositoryApi
