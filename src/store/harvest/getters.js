export const dataTableGeneral = ({ generalStatsTable }) => generalStatsTable
export const dataTableGROWN = ({ seedsGrownTable }) => seedsGrownTable
export const dataTableIND = ({ peopleAccountsTable }) => peopleAccountsTable
export const dataTableORG = ({ organizationAccountsTable }) => organizationAccountsTable
export const dataTableBDC = ({ bdcsTable }) => bdcsTable
export const dataTableGDC = ({ gdcTable }) => gdcTable
export const simulationStep = ({ simulationStep }) => simulationStep
export const totalSimulationSteps = ({ simulationState }) => {
  if (simulationState.length > 0) {
    return simulationState.length - 1
  } else {
    return 0
  }
}
export const dataChart = ({ dataChart }) => dataChart
export const getSimulationState = ({ simulationState }) => simulationState
export const cycleDataForm = ({ simulationStep, simulationState, stateForm }) => {
  if (simulationState.length === 1) {
    return simulationState[0]
  } else if (simulationState.length > 0) {
    return simulationState[simulationStep]
  } else return stateForm
}
