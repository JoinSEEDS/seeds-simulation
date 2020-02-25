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
export const setDataChart = (state, data) => {
  state.dataChart = data
}
export const setDataSimulationState = (state, data) => {
  if (data.append) {
    for (let i = 0; i < data.simulation.length; i++) {
      state.simulationState.push(data.simulation[i])
    }
  } else {
    state.simulationState[data.step] = data.simulation
  }
}
