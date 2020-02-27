export const dataTableGROWN = ({ seedsGrownTable }) => seedsGrownTable
export const dataTableIND = ({ peopleAccountsTable }) => peopleAccountsTable
export const dataTableORG = ({ organizationAccountsTable }) => organizationAccountsTable
export const dataTableBDC = ({ bdcsTable }) => bdcsTable
export const dataTableGDC = ({ gdcTable }) => gdcTable
export const simulationStep = ({ simulationStep }) => simulationStep
export const totalSimulationSteps = ({ simulationState }) => simulationState.length
export const dataChart = ({ dataChart }) => dataChart
export const cycleDataForm = ({ simulationStep, simulationState, stateForm }) => {
  if (simulationState.length > 0) {
    return simulationState[simulationStep - 1]
  } else return stateForm
}
