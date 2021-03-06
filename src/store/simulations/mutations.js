export const addToAllSimulations = (state, simulations) => {
  state.allSimulations.rows = state.allSimulations.rows.concat(simulations.rows)
  state.allSimulations.more = simulations.more
}

export const addToMySimulations = (state, simulations) => {
  state.mySimulations.rows = state.mySimulations.rows.concat(simulations.rows)
  state.mySimulations.more = simulations.more
}

export const cleanMySimulations = (state) => {
  state.mySimulations.rows = []
  state.mySimulations.more = true
}

export const cleanAllSimulations = (state) => {
  state.allSimulations.rows = []
  state.allSimulations.more = true
}

export const setEditingMySimulation = (state, simulation) => {
  state.editingMySimulation.status = true
  state.editingMySimulation.simulation = simulation
}

export const updateEditingMySimulation = (state, simulationName) => {
  // state.editingMySimulation.status = true
  state.editingMySimulation.simulation.name = simulationName
}

export const restartEditingMySimulation = (state) => {
  state.editingMySimulation.status = false
  state.editingMySimulation.simulation = undefined
}
