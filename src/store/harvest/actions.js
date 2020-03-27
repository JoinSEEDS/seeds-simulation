import { HarvestConstants } from '~/const'
import { doNextCycle, initCycle } from '~/services/harvest'

export const getDataTable = async function ({ dispatch, commit, state }, { tableId, step = -1 }) {
  const structureAll = ({ numberUsers, totalAmount, totalAmountPerUser }) => {
    const rows = []
    for (let i = 0; i < numberUsers.length; i++) {
      rows.push({
        position: i,
        numberUsers: numberUsers[i],
        totalAmount: totalAmount[i],
        totalAmountPerUser: totalAmountPerUser[i]
      })
    }
    return rows.reverse()
  }

  const getBdcRows = ({ numBdcs, budget, regenGrants, regenLoans, openProposal }) => {
    const rows = []
    for (let i = 0; i < numBdcs.length; i++) {
      rows.push({
        position: i,
        numBdcs: numBdcs[i],
        budget: budget[i],
        regenGrants: regenGrants[i],
        regenLoans: regenLoans[i],
        openProposal: openProposal[i]
      })
    }
    return rows.reverse()
  }
  // Do your magic
  // Filter by tableID
  if (step === -1) {
    step = state.simulationState.length - 1
  }
  const stepState = state.simulationState[step]
  const { harvestDistribution } = stepState
  const { totals } = stepState
  switch (tableId) {
    case HarvestConstants.SEEDS_GROWN: // Replace by constant
      commit('setDataSeedsGrownTable', {
        tableName: 'Seeds Grown',
        rows: [
          {
            seeds3cycles: stepState.seedsGrownPerCycle * 3,
            seedsPerCycle: stepState.seedsGrownPerCycle,
            seedsPerBlock: stepState.seedsGrownPerCycle / (HarvestConstants.CYCLE * 172800)
          }]
      })
      break
    case HarvestConstants.SEEDS_IND_ACCNTS:
      const {
        totalAmountForAccounts,
        first,
        middle,
        last,
        all
      } = harvestDistribution.peopleAccounts
      commit('setDataPeopleAccountsTable', {
        tableName: 'Seeds Distributed for Individual Accounts',
        totalAmount: totalAmountForAccounts,
        all: structureAll(all),
        sample3: [
          {
            position: 'first',
            ...first
          },
          {
            position: 'middle',
            ...middle
          },
          {
            position: 'last',
            ...last
          }
        ]
      })
      break
    case HarvestConstants.SEEDS_ORG_ACCNTS:
      const {
        totalAmountForOrganizations,
        firstOrg,
        middleOrg,
        lastOrg,
        allOrg
      } = harvestDistribution.organizationAccounts
      commit('setDataOrganizationsAccountsTable', {
        tableName: 'Seeds Distributed for Organization Accounts',
        totalAmount: totalAmountForOrganizations,
        all: structureAll(allOrg),
        sample3: [
          {
            position: 'first',
            ...firstOrg
          },
          {
            position: 'middle',
            ...middleOrg
          },
          {
            position: 'last',
            ...lastOrg
          }
        ]
      })
      break
    case HarvestConstants.SEEDS_BDC:
      const {
        totalAmountForBdcs,
        firstBdc,
        middleBdc,
        lastBdc,
        allBdc
      } = harvestDistribution.bdcs
      commit('setDataBdcsTable', {
        tableName: 'Seeds Distributed for BDCs',
        totalAmount: totalAmountForBdcs,
        all: getBdcRows(allBdc),
        sample3: [
          {
            position: 'first',
            ...firstBdc
          },
          {
            position: 'middle',
            ...middleBdc
          },
          {
            position: 'last',
            ...lastBdc
          }
        ]
      })
      break
    case HarvestConstants.SEEDS_GDC:
      commit('setDataGdcTable', {
        tableName: 'Seeds for GDC',
        rows: [
          {
            totalAmountForGdc: harvestDistribution.gdcs.totalAmountForGdc,
            networkMaintenance: harvestDistribution.gdcs.networkMaintenance,
            regenGrants: harvestDistribution.gdcs.regenGrants,
            coreDevelopment: harvestDistribution.gdcs.coreDevelopment,
            interestFreeLoans: harvestDistribution.gdcs.interestFreeLoans
          }]
      })
      break
    case HarvestConstants.SEEDS_GENERAL:
      commit('setDataGeneralTable', {
        tableName: 'General Information',
        rows: [
          {
            totalSeeds: totals.seeds,
            totalCirculatingSeeds: totals.circulatingSeeds,
            totalSeedsPlanted: totals.plantedSeeds,
            totalSeedsBurned: totals.burnedSeeds
          }
        ]
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
    // commit('setDataChart', undefined)
  }

  switch (tableId) {
    case HarvestConstants.SEEDS_GROWN:
      data = {
        categories: Array.from(Array(state.simulationState.length - 1).keys()),
        series: [
          {
            name: 'Seeds Grown 3 Cycles',
            data: state.simulationState.slice(1).map(s => { return s.seedsGrownPerCycle * 3 })
          },
          {
            name: 'Seeds Grown Per Cycle',
            data: state.simulationState.slice(1).map(s => { return s.seedsGrownPerCycle }),
            visible: false
          },
          {
            name: 'Seeds Grown Per Block',
            data: state.simulationState.slice(1).map(s => { return s.seedsGrownPerCycle / (HarvestConstants.CYCLE * 172800) }),
            visible: false
          }
        ],
        chartName: 'Seeds Grown'
      }
      break
    case HarvestConstants.SEEDS_IND_ACCNTS:
      data = {
        categories: Array.from(Array(state.simulationState.length - 1).keys()),
        series: [
          {
            name: 'Total Amount For People',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.peopleAccounts.totalAmountForAccounts })
          },
          {
            name: 'Total Amount Per Rank (first)',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.peopleAccounts.first.totalAmount }),
            visible: false
          },
          {
            name: 'Total Amount Per Rank (middle)',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.peopleAccounts.middle.totalAmount }),
            visible: false
          },
          {
            name: 'Total Amount Per Rank (last)',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.peopleAccounts.last.totalAmount }),
            visible: false
          }
        ],
        chartName: 'Seeds Individual Accounts'
      }
      break
    case HarvestConstants.SEEDS_ORG_ACCNTS:
      data = {
        categories: Array.from(Array(state.simulationState.length - 1).keys()),
        series: [
          {
            name: 'Total Amount For Organizations',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.organizationAccounts.totalAmountForOrganizations })
          },
          {
            name: 'Total Amount per Rank (first)',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.organizationAccounts.firstOrg.totalAmount }),
            visible: false
          },
          {
            name: 'Total Amount per Rank (middle)',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.organizationAccounts.middleOrg.totalAmount }),
            visible: false
          },
          {
            name: 'Total Amount per Rank (last)',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.organizationAccounts.lastOrg.totalAmount }),
            visible: false
          }
        ],
        chartName: 'Seeds Organization Accounts'
      }
      break
    case HarvestConstants.SEEDS_BDC:
      data = {
        categories: Array.from(Array(state.simulationState.length - 1).keys()),
        series: [
          {
            name: 'Total Amount For BDC',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.bdcs.totalAmountForBdcs })
          },
          {
            name: 'Total Amount Per Rank (first)',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.bdcs.firstBdc.budget }),
            visible: false
          },
          {
            name: 'Total Amount Per Rank (middle)',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.bdcs.middleBdc.budget }),
            visible: false
          },
          {
            name: 'Total Amount Per Rank (last)',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.bdcs.lastBdc.budget }),
            visible: false
          }
        ],
        chartName: 'Seeds BDCs'
      }
      break
    case HarvestConstants.SEEDS_GDC:
      data = {
        categories: Array.from(Array(state.simulationState.length - 1).keys()),
        series: [
          {
            name: 'Total Amount For GDC',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.gdcs.totalAmountForGdc })
          },
          {
            name: 'Network Maintenance',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.gdcs.networkMaintenance }),
            visible: false
          },
          {
            name: 'Regen Grants',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.gdcs.regenGrants }),
            visible: false
          },
          {
            name: 'Core Development',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.gdcs.coreDevelopment }),
            visible: false
          },
          {
            name: 'Interest Free Loans',
            data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.gdcs.interestFreeLoans }),
            visible: false
          }
        ],
        chartName: 'Seeds GDC'
      }
      break
    case HarvestConstants.SEEDS_GENERAL:
      data = {
        categories: Array.from(Array(state.simulationState.length - 1).keys()),
        series: [
          {
            name: 'Total Seeds',
            data: state.simulationState.slice(1).map(s => { return s.totals.seeds })
          },
          {
            name: 'Total Circulating Seeds',
            data: state.simulationState.slice(1).map(s => { return s.totals.circulatingSeeds }),
            visible: false
          },
          {
            name: 'Total Planted Seeds',
            data: state.simulationState.slice(1).map(s => { return s.totals.plantedSeeds }),
            visible: false
          },
          {
            name: 'Total Burned Seeds',
            data: state.simulationState.slice(1).map(s => { return s.totals.burnedSeeds }),
            visible: false
          }
        ]
      }
      break
    default:
      data = undefined
      return
  }
  commit('setDataChart', data)
  return true
}

export const setCycleTables = async function ({ dispatch, commit, state }, { step = -1 }) {
  if (step === -1) {
    step = state.simulationState.length - 1
  }

  console.log('LOOK AT THAT (setCycleTables):', step)

  for (let i = 1; i <= 6; i++) {
    getDataTable({ dispatch, commit, state }, { tableId: i, step: step })
  }

  return true
}

export const doCycle = async function ({ dispatch, commit, state }, { simulationState, step = -1 }) {
  if (step === -1) {
    step = state.simulationState.length
  }

  if (state.simulationState.length === 0) {
    let initState = initCycle(Object.assign({}, simulationState))
    let newState = doNextCycle(Object.assign({}, initState), true)
    commit('setDataSimulationState', { simulation: [initState, newState], step: step })
    step = 1
    // console.log(JSON.stringify(state.simulationState[0]))
  } else {
    let newState = doNextCycle(Object.assign({}, simulationState), true)
    commit('setDataSimulationState', { simulation: [newState], step: step })
  }

  console.log('LOOK AT THAT:', state.simulationState.length - 1)
  setCycleTables({ dispatch, commit, state }, { step: state.simulationState.length - 1 })
  commit('setSimulationStep', state.simulationState.length - 1)
  // commit('setSimulationStep', state.simulationState.length - 1)
  // commit('setDataForm', simulationState)

  return true
}

export const getInitSimulationStep = async function ({ dispatch, commit, state }) {
  commit('setSimulationStep', state.simulationState.length)
  return true
}
