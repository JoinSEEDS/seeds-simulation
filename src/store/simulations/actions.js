export const initWakeDb = async function ({ dispatch, commit, state }) {
  try {
    console.log('initWakeDb', this.$simulationRepositoryApi)
    await this.$simulationRepositoryApi.wakeDb()
  } catch (error) {
    throw new Error(error)
  }
  // commit('setSimulationStep', state.simulationState.length)
  // return true
}
export const getInitSimulationStep = async function ({ dispatch, commit, state }) {
  commit('setSimulationStep', state.simulationState.length)
  return true
}
