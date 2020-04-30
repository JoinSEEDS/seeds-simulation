import axios from 'axios'
import sleep from 'sleep-promise'

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

  /**
   * Save or update simulation
   * @param {string} [id] is optional, if set then the simulation is updated
   * @param {string} account creator account
   * @param {string} name name of the simulation
   * @param {string} description
   * @param {object} data simulation data
   * @returns {object} the saved simulation
   * @throws {error} incase of error
   */
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
    return this._post('/delete-simulation', {
      id,
      account
    })
  }

  async wakeDb () {
    console.log('Waking Db Up...')
    const { data } = await this._get('/wake-db', null, false)
    return data
  }

  async fetchData (s3Key) {
    const baseRepository = process.env.BASE_REPOSITORY_URL
    const { data } = await this._get(baseRepository + '/' + s3Key)
    return data
  }

  /**
   * Search simulations
   *
   * @param {string} [account] creator account
   * @param {string} [term] to search for in name and description
   * @param {string} [orderBy] name of column to order by
   * @param {boolean} [desc] whether it should be ordered in descending order
   * @param {int} offset
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
    const { data } = await this._post('/search-simulation', {
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
    const { data } = await this._post('/save-simulation', {
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
    return axios.put(uploadUrl, simulation,
      {
        headers: {
          'content-type': 'application/json;charset=UTF-8'
        }
      }
    )
  }

  async _get (url, params, retry = true) {
    return this._request(
      {
        method: 'get',
        url,
        params
      },
      retry
    )
  }

  async _post (url, data, retry = true) {
    return this._request(
      {
        method: 'post',
        url,
        data
      },
      retry
    )
  }

  /**
   *
   * @param {string} [method] default get
   * @param {string} url
   * @param {object} data
   */
  async _request (params, retry = true) {
    try {
      const response = await this.axios(params)
      return response
    } catch (error) {
      console.log('Error making request: ', error)
      if (retry) {
        if (error.response) {
          const {
            data
          } = error.response
          if (data.retryable) {
            await sleep(process.env.RETRY_DELAY)
            return this._request(params, retry)
          }
        }
      }
      throw error
    }
  }
}

export default SimulationRepositoryApi
