export const setDataSeedsGrownTable = (state, data) => {
  state.seedsGrownTable = data
}
export const setDataPeopleAccountsTable = (state, data) => {
  state.peopleAccountsTable = data
}
export const setDataOrganizationsAccountsTable = (state, data) => {
  state.organizationAccountsTable = data
}
export const setDataBdcsTable = (state, data) => {
  state.bdcsTable = data
}
export const setDataGdcTable = (state, data) => {
  state.gdcTable = data
}
export const setDataGeneralTable = (state, data) => {
  state.generalStatsTable = data
}
export const setDataChart = (state, data) => {
  state.dataChart = data
}
export const setDataSimulationState = (state, data) => {
  // console.log('Antes del spilce', state.simulationState)
  // console.log('Antes del spilce Step:', data.step)
  if (data.step < state.simulationState.length) {
    state.simulationState.splice(data.step + 1, state.simulationState.length)
  }
  for (let i = 0; i < data.simulation.length; i++) {
    state.simulationState.push(data.simulation[i])
  }
}
export const overwriteSimulationState = (state, newState) => {
  state.simulationState = newState
}
export const setSimulationStep = (state, step) => {
  state.simulationStep = step
}
export const setDataForm = (state, dataForm) => {
  state.stateForm = dataForm
}
