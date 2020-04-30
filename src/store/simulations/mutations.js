export const addToAllSimulations = (state, simulations) => {
  state.allSimulations.rows = state.allSimulations.rows.concat(simulations.rows)
  state.allSimulations.more = simulations.more
}

export const setSimulationStep = (state, step) => {
  state.simulationStep = step
}
export const setDataForm = (state, dataForm) => {
  state.stateForm = dataForm
}
