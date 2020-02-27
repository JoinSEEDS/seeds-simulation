import { HarvestConstants } from '~/const'
import { doNextCycle } from '~/services/harvest'

export const getDataTable = async function ({ dispatch, commit, state }, { tableId, step = -1 }) {
  // Do your magic
  // Filter by tableID
  if (step === -1) {
    step = state.simulationState.length - 1
  }

  switch (tableId) {
    case HarvestConstants.SEEDS_GROWN: // Replace by constant
      commit('setDataSeedsGrownTable', {
        tableName: 'Seeds Grown',
        rows: [
          {
            seeds3cycles: state.simulationState[step].seedsGrownPerCycle * 3,
            seedsPerCycle: state.simulationState[step].seedsGrownPerCycle,
            seedsPerBlock: state.simulationState[step].seedsGrownPerCycle / (HarvestConstants.CYCLE * 172800)
          }]
      })
      break
    case HarvestConstants.SEEDS_IND_ACCNTS:
      commit('setDataPeopleAccountsTable', {
        tableName: 'Seeds Distributed for Individual Accounts',
        totalAmount: state.simulationState[step].harvestDistribution.peopleAccounts.totalAmountForAccounts,
        rows: [
          {
            position: 'first',
            numberUsers: state.simulationState[step].harvestDistribution.peopleAccounts.first.numberUsers,
            totalAmount: state.simulationState[step].harvestDistribution.peopleAccounts.first.totalAmount,
            totalAmountPerUser: state.simulationState[step].harvestDistribution.peopleAccounts.first.totalAmountPerUser
          },
          {
            position: 'middle',
            numberUsers: state.simulationState[step].harvestDistribution.peopleAccounts.middle.numberUsers,
            totalAmount: state.simulationState[step].harvestDistribution.peopleAccounts.middle.totalAmount,
            totalAmountPerUser: state.simulationState[step].harvestDistribution.peopleAccounts.middle.totalAmountPerUser
          },
          {
            position: 'last',
            numberUsers: state.simulationState[step].harvestDistribution.peopleAccounts.last.numberUsers,
            totalAmount: state.simulationState[step].harvestDistribution.peopleAccounts.last.totalAmount,
            totalAmountPerUser: state.simulationState[step].harvestDistribution.peopleAccounts.last.totalAmountPerUser
          }
        ]
      })
      break
    case HarvestConstants.SEEDS_ORG_ACCNTS:
      commit('setDataOrganizationsAccountsTable', {
        tableName: 'Seeds Distributed for Organization Accounts',
        totalAmount: state.simulationState[step].harvestDistribution.organizationAccounts.totalAmountForOrganizations,
        rows: [
          {
            position: 'first',
            numberUsers: state.simulationState[step].harvestDistribution.organizationAccounts.first.numberUsers,
            totalAmount: state.simulationState[step].harvestDistribution.organizationAccounts.first.totalAmount,
            totalAmountPerOrganization: state.simulationState[step].harvestDistribution.organizationAccounts.first.totalAmountPerUser
          },
          {
            position: 'middle',
            numberUsers: state.simulationState[step].harvestDistribution.organizationAccounts.middle.numberUsers,
            totalAmount: state.simulationState[step].harvestDistribution.organizationAccounts.middle.totalAmount,
            totalAmountPerOrganization: state.simulationState[step].harvestDistribution.organizationAccounts.middle.totalAmountPerUser
          },
          {
            position: 'last',
            numberUsers: state.simulationState[step].harvestDistribution.organizationAccounts.last.numberUsers,
            totalAmount: state.simulationState[step].harvestDistribution.organizationAccounts.last.totalAmount,
            totalAmountPerOrganization: state.simulationState[step].harvestDistribution.organizationAccounts.last.totalAmountPerUser
          }
        ]
      })
      break
    case HarvestConstants.SEEDS_BDC:
      commit('setDataBdcsTable', {
        tableName: 'Seeds Distributed for BDCs',
        totalAmount: state.simulationState[step].harvestDistribution.bdcs.totalAmountForBdcs,
        rows: [
          {
            position: 'first',
            numBdc: state.simulationState[step].harvestDistribution.bdcs.first.numBdcs,
            budget: state.simulationState[step].harvestDistribution.bdcs.first.budget,
            totalAmount: state.simulationState[step].harvestDistribution.bdcs.first.budgetPerBdc.totalAmount,
            regenGrants: state.simulationState[step].harvestDistribution.bdcs.first.budgetPerBdc.regenGrants,
            regenLoans: state.simulationState[step].harvestDistribution.bdcs.first.budgetPerBdc.regenLoans,
            openProposal: state.simulationState[step].harvestDistribution.bdcs.first.budgetPerBdc.openProposal
          },
          {
            position: 'middle',
            numBdc: state.simulationState[step].harvestDistribution.bdcs.middle.numBdcs,
            budget: state.simulationState[step].harvestDistribution.bdcs.middle.budget,
            totalAmount: state.simulationState[step].harvestDistribution.bdcs.middle.budgetPerBdc.totalAmount,
            regenGrants: state.simulationState[step].harvestDistribution.bdcs.middle.budgetPerBdc.regenGrants,
            regenLoans: state.simulationState[step].harvestDistribution.bdcs.middle.budgetPerBdc.regenLoans,
            openProposal: state.simulationState[step].harvestDistribution.bdcs.middle.budgetPerBdc.openProposal
          },
          {
            position: 'last',
            numBdc: state.simulationState[step].harvestDistribution.bdcs.last.numBdcs,
            budget: state.simulationState[step].harvestDistribution.bdcs.last.budget,
            totalAmount: state.simulationState[step].harvestDistribution.bdcs.last.budgetPerBdc.totalAmount,
            regenGrants: state.simulationState[step].harvestDistribution.bdcs.last.budgetPerBdc.regenGrants,
            regenLoans: state.simulationState[step].harvestDistribution.bdcs.last.budgetPerBdc.regenLoans,
            openProposal: state.simulationState[step].harvestDistribution.bdcs.last.budgetPerBdc.openProposal
          }
        ]
      })
      break
    case HarvestConstants.SEEDS_GDC:
      commit('setDataGdcTable', {
        tableName: 'Seeds for GDC',
        rows: [
          {
            totalAmountForGdc: state.simulationState[step].harvestDistribution.gdcs.totalAmountForGdc,
            networkMaintenance: state.simulationState[step].harvestDistribution.gdcs.networkMaintenance,
            regenGrants: state.simulationState[step].harvestDistribution.gdcs.regenGrants,
            coreDevelopment: state.simulationState[step].harvestDistribution.gdcs.coreDevelopment,
            interestFreeLoans: state.simulationState[step].harvestDistribution.gdcs.interestFreeLoans
          }]
      })
      break
    default:
      break
  }
  return true
}

export const getDataChart = async function ({ dispatch, commit, state }, { tableId }) {
  console.log('getDataChart function')
  let data

  if (state.simulationState.length === 0) {
    // commit('setDataChart', { chartName: 'First Select a table' })
    commit('setDataChart', undefined)
  }

  switch (tableId) {
    case HarvestConstants.SEEDS_GROWN:
      data = {
        categories: Array.from(Array(state.simulationState.length).keys()),
        series: [
          {
            name: 'Seeds Grown 3 Cycles',
            data: state.simulationState.map(s => { return s.seedsGrownPerCycle * 3 })
          },
          {
            name: 'Seeds Grown Per Cycle',
            data: state.simulationState.map(s => { return s.seedsGrownPerCycle }),
            visible: false
          },
          {
            name: 'Seeds Grown Per Block',
            data: state.simulationState.map(s => { return s.seedsGrownPerCycle / (HarvestConstants.CYCLE * 172800) }),
            visible: false
          }
        ],
        chartName: 'Seeds Grown'
      }
      break
    case HarvestConstants.SEEDS_IND_ACCNTS:
      data = {
        categories: Array.from(Array(state.simulationState.length).keys()),
        series: [
          {
            name: 'Total Amount For People',
            data: state.simulationState.map(s => { return s.harvestDistribution.peopleAccounts.totalAmountForAccounts })
          },
          {
            name: 'Total Amount Per User (first)',
            data: state.simulationState.map(s => { return s.harvestDistribution.peopleAccounts.first.totalAmountPerUser }),
            visible: false
          },
          {
            name: 'Total Amount Per User (middle)',
            data: state.simulationState.map(s => { return s.harvestDistribution.peopleAccounts.middle.totalAmountPerUser }),
            visible: false
          },
          {
            name: 'Total Amount Per User (last)',
            data: state.simulationState.map(s => { return s.harvestDistribution.peopleAccounts.last.totalAmountPerUser }),
            visible: false
          }
        ],
        chartName: 'Seeds Individual Accounts'
      }
      break
    case HarvestConstants.SEEDS_ORG_ACCNTS:
      data = {
        categories: Array.from(Array(state.simulationState.length).keys()),
        series: [
          {
            name: 'Total Amount For Organizations',
            data: state.simulationState.map(s => { return s.harvestDistribution.organizationAccounts.totalAmountForOrganizations })
          },
          {
            name: 'Total Amount per Organization (first)',
            data: state.simulationState.map(s => { return s.harvestDistribution.organizationAccounts.first.totalAmountPerUser }),
            visible: false
          },
          {
            name: 'Total Amount per Organization (middle)',
            data: state.simulationState.map(s => { return s.harvestDistribution.organizationAccounts.middle.totalAmountPerUser }),
            visible: false
          },
          {
            name: 'Total Amount per Organization (last)',
            data: state.simulationState.map(s => { return s.harvestDistribution.organizationAccounts.last.totalAmountPerUser }),
            visible: false
          }
        ],
        chartName: 'Seeds Organization Accounts'
      }
      break
    case HarvestConstants.SEEDS_BDC:
      data = {
        categories: Array.from(Array(state.simulationState.length).keys()),
        series: [
          {
            name: 'Total Amount For BDC',
            data: state.simulationState.map(s => { return s.harvestDistribution.bdcs.totalAmountForBdcs })
          },
          {
            name: 'Total Amount Per BDC (first)',
            data: state.simulationState.map(s => { return s.harvestDistribution.bdcs.first.budgetPerBdc.totalAmount }),
            visible: false
          },
          {
            name: 'Regen Grants Per BDC (first)',
            data: state.simulationState.map(s => { return s.harvestDistribution.bdcs.first.budgetPerBdc.regenGrants }),
            visible: false
          },
          {
            name: 'Regen Loans Per BDC (first)',
            data: state.simulationState.map(s => { return s.harvestDistribution.bdcs.first.budgetPerBdc.regenLoans }),
            visible: false
          },
          {
            name: 'Open Proposals Per BDC (first)',
            data: state.simulationState.map(s => { return s.harvestDistribution.bdcs.first.budgetPerBdc.openProposal }),
            visible: false
          }
        ],
        chartName: 'Seeds BDCs'
      }
      break
    case HarvestConstants.SEEDS_GDC:
      data = {
        categories: Array.from(Array(state.simulationState.length).keys()),
        series: [
          {
            name: 'Total Amount For GDC',
            data: state.simulationState.map(s => { return s.harvestDistribution.gdcs.totalAmountForGdc })
          },
          {
            name: 'Network Maintenance',
            data: state.simulationState.map(s => { return s.harvestDistribution.gdcs.networkMaintenance }),
            visible: false
          },
          {
            name: 'Regen Grants',
            data: state.simulationState.map(s => { return s.harvestDistribution.gdcs.regenGrants }),
            visible: false
          },
          {
            name: 'Core Development',
            data: state.simulationState.map(s => { return s.harvestDistribution.gdcs.coreDevelopment }),
            visible: false
          },
          {
            name: 'Interest Free Loans',
            data: state.simulationState.map(s => { return s.harvestDistribution.gdcs.interestFreeLoans }),
            visible: false
          }
        ],
        chartName: 'Seeds GDC'
      }
      break
    default:
      data = undefined
      break
  }
  commit('setDataChart', data)
  return true
}

export const setCycleTables = async function ({ dispatch, commit, state }, { step = -1 }) {
  if (step === -1) {
    step = state.simulationState.length - 1
  }

  for (let i = 1; i <= 5; i++) {
    getDataTable({ dispatch, commit, state }, { tableId: i, step: step })
  }

  return true
}

export const doCycle = async function ({ dispatch, commit, state }, { simulationState, step = -1 }) {
  if (step === -1) {
    step = state.simulationState.length
  }
  console.log('Inicio de DoCycle', state.simulationState)
  console.log('Inicio de DoCycle my', simulationState)
  if (state.simulationState.length === 0) {
    let initState = doNextCycle(Object.assign({}, simulationState), false)
    let newState = doNextCycle(Object.assign({}, simulationState), true)
    commit('setDataSimulationState', { simulation: [initState, newState], step: step })
    // console.log(JSON.stringify(state.simulationState[0]))
  } else {
    let newState = doNextCycle(Object.assign({}, simulationState), true)
    commit('setDataSimulationState', { simulation: [newState], step: step })
  }

  setCycleTables({ dispatch, commit, state }, { step: step })
  commit('setSimulationStep', state.simulationState.length)
  // commit('setDataForm', simulationState)

  return true
}

export const getInitSimulationStep = async function ({ dispatch, commit, state }) {
  commit('setSimulationStep', state.simulationState.length)
  return true
}
