export const initWakeDb = async function () {
  try {
    await this.$simulationRepositoryApi.wakeDb()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
  // commit('setSimulationStep', state.simulationState.length)
  // return true
}

export const saveSimulation = async function ({ state, dispatch, commit }, payload) {
  try {
    console.log('saveSimulation', payload)
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$simulationRepositoryApi.save(payload)
    return response
  } catch (error) {
    console.error(error)
    throw new Error(error)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }

  // commit('setSimulationStep', state.simulationState.length)
}

export const searchMySimulations = async function ({ commit }, payload) {
  try {
    payload['account'] = this.state.accounts.account
    // payload['account'] = 'sebastianmb2'
    const simulations = await this.$simulationRepositoryApi.search(payload)
    commit('addToMySimulations', simulations)
    return simulations
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export const searchAllSimulations = async function ({ dispatch, commit }, payload) {
  try {
    const simulations = await this.$simulationRepositoryApi.search(payload)
    commit('addToAllSimulations', simulations)
    return simulations
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}
