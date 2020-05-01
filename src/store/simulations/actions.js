export const initWakeDb = async function () {
  try {
    await this.$simulationRepositoryApi.wakeDb()
    setTimeout(async () => {
      await this.$simulationRepositoryApi.wakeDb()
    }, (process.env.WAKE_DB_TIME * 60))
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
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

export const getSimulationData = async function ({ dispatch, commit }, simulationToLoad) {
  try {
    commit('general/setIsLoading', true, { root: true })
    console.log(simulationToLoad)
    const simulations = await this.$simulationRepositoryApi.fetchData(simulationToLoad.s3Key)
    commit('harvest/overwriteSimulationState', simulations, { root: true })
    commit('harvest/setSimulationStep', simulations.length - 1, { root: true })
    if (this.state.accounts.account === simulationToLoad.creatorAccount) {
      commit('setEditingMySimulation', simulationToLoad)
    } else {
      commit('restartEditingMySimulation', simulationToLoad)
    }
    this.$EventBus.$emit('simulation-applied')
    return simulations
  } catch (error) {
    console.error(error)
    throw new Error(error)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const cleanSimulationData = async function ({ dispatch, commit }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    commit('harvest/overwriteSimulationState', [], { root: true })
    commit('harvest/setSimulationStep', 0, { root: true })
    commit('restartEditingMySimulation')
    this.$EventBus.$emit('simulation-cleaned')
    return true
  } catch (error) {
    console.error(error)
    throw new Error(error)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const deleteSimulation = async function ({ dispatch, commit }, payload) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$simulationRepositoryApi.delete(payload)
    return response
  } catch (error) {
    console.error(error)
    throw new Error(error)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
