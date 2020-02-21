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
            data: state.stateSimulation.map(s => { return s.seeds_grown_per_cycle * 3 })
          },
          {
            name: 'Seeds Grown Per Cycle',
            data: state.stateSimulation.map(s => { return s.seeds_grown_per_cycle })
          },
          {
            name: 'Seeds Grown Per Block',
            data: state.stateSimulation.map(s => { return s.seeds_grown_per_cycle / (HarvestConstants.CYCLE * 172800) })
          }
        ]
      }
      break
    case HarvestConstants.SEEDS_IND_ACCNTS:
      data = {
        categories: Array.from(Array(state.stateSimulation.length).keys()),
        series: [
          {
            name: 'Total Amount For People',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.people_accounts.total_amount_for_accounts })
          },
          {
            name: 'Total Amount Per User (first)',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.people_accounts.first.total_amount_per_user })
          },
          {
            name: 'Total Amount Per User (middle)',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.people_accounts.middle.total_amount_per_user })
          },
          {
            name: 'Total Amount Per User (last)',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.people_accounts.last.total_amount_per_user })
          }
        ]
      }
      break
    case HarvestConstants.SEEDS_ORG_ACCNTS:
      data = {
        categories: Array.from(Array(state.stateSimulation.length).keys()),
        series: [
          {
            name: 'Total Amount For Organizations',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.organization_accounts.total_amount_for_organizations })
          },
          {
            name: 'Total Amount per Organization (first)',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.organization_accounts.first.total_amount_per_user })
          },
          {
            name: 'Total Amount per Organization (middle)',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.organization_accounts.middle.total_amount_per_user })
          },
          {
            name: 'Total Amount per Organization (last)',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.organization_accounts.last.total_amount_per_user })
          }
        ]
      }
      break
    case HarvestConstants.SEEDS_BDC:
      data = {
        categories: Array.from(Array(state.stateSimulation.length).keys()),
        series: [
          {
            name: 'Total Amount For BDC',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.bdcs.total_amount_for_bdcs })
          },
          {
            name: 'Total Amount Per BDC (first)',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.bdcs.first.budget_per_bdc.total_amount })
          },
          {
            name: 'Regen Grants Per BDC (first)',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.bdcs.first.budget_per_bdc.regen_grants })
          },
          {
            name: 'Regen Loans Per BDC (first)',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.bdcs.first.budget_per_bdc.regen_loans })
          },
          {
            name: 'Open Proposals Per BDC (first)',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.bdcs.first.budget_per_bdc.open_proposal })
          }
        ]
      }
      break
    case HarvestConstants.SEEDS_GDC:
      data = {
        categories: Array.from(Array(state.stateSimulation.length).keys()),
        series: [
          {
            name: 'Total Amount For GDC',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.gdcs.total_amount_for_gdc })
          },
          {
            name: 'Network Maintenance',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.gdcs.network_maintenance })
          },
          {
            name: 'Regen Grants',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.gdcs.regen_grants })
          },
          {
            name: 'Regen Loans',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.gdcs.regen_loans })
          },
          {
            name: 'Core Development',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.gdcs.core_development })
          },
          {
            name: 'Interest Free Loans',
            data: state.stateSimulation.map(s => { return s.harvest_distribution.gdcs.interest_free_loans })
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
