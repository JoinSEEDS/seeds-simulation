import { HarvestConstants } from '~/const'

export const getDataTable = async function ({ dispatch, commit }, tableId, step) {
  // Do your magic
  // Filter by tableID
  const data = { test: 'mira no mas' }
  console.log('Get data table for the id:', tableId)
  console.log('data:', data)
  switch (tableId) {
    case HarvestConstants.SEEDS_CREATED: // Replace by constant
      console.log('yes i am here')
      commit('setDataTable1', {
        name: 'Seeds Created',
        seeds3cycles: 2,
        seedsPerCycle: 2,
        seedsPerBlock: 1
      })
      break
    case 2: // Replace by constant
      commit('setDataTable2', data)
      break
    default:
      break
  }
  return true
}

export const getDataChart = async function ({ dispatch, commit, state }, tableId) {
  console.log('getDataChart function')
  let data

  switch (tableId) {
    case HarvestConstants.SEEDS_CREATED:
      data = {
        categories: Array.from(Array(state.stateSimulation.length).keys()),
        series: [
          {
            name: 'Seeds Grown 3 Cycles',
            d: state.stateSimulation.map(s => { return s.seeds_grown_per_cycle * 3 })
          },
          {
            name: 'Seeds Grown Per Cycle',
            d: state.stateSimulation.map(s => { return s.seeds_grown_per_cycle })
          },
          {
            name: 'Seeds Grown Per Block',
            d: state.stateSimulation.map(s => { return s.seeds_grown_per_cycle / (HarvestConstants.CYCLE * 172800) })
          }
        ]
      }
      break
    default:
      break
  }

  commit('setDataChart', data)
  return true
}

export const doCycle = async function ({ dispatch, commit }) {
  return true
}

export const editSimulationState = async function ({ dispatch, commit }, stateEdited, step) {
  return true
}
