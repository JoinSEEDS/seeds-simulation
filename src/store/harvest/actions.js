import { HarvestConstants } from '~/const'
import { doNextCycle, initCycle } from '~/services/harvest'

export const getDataTable = async function ({ dispatch, commit, state }, { tableId, step = -1 }) {
  if (state.simulationState.length === 0) return
  const structureAll = ({ numberUsers, totalAmount, totalAmountPerUser, k }) => {
    const rows = []
    for (let i = k; i < numberUsers.length; i += (1 + k)) {
      rows.push({
        position: i,
        numberUsers: numberUsers[i],
        totalAmount: totalAmount[i],
        totalAmountPerUser: totalAmountPerUser[i]
      })
    }
    return rows.reverse()
  }

  const getBdcRows = ({ numBdcs, budget, budgetPerBdc, regenGrants, regenLoans, openProposal, k }) => {
    const rows = []
    for (let i = k; i < numBdcs.length; i += (1 + k)) {
      rows.push({
        position: i,
        numBdcs: numBdcs[i],
        budget: budget[i],
        budgetPerBdc: budgetPerBdc[i],
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
        tableName: 'People Accounts',
        totalAmount: totalAmountForAccounts,
        all: structureAll({ ...all, k: 0 }),
        sample10: structureAll({ ...all, k: 9 }),
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
        tableName: 'Organizations Accounts',
        totalAmount: totalAmountForOrganizations,
        all: structureAll({ ...allOrg, k: 0 }),
        sample10: structureAll({ ...allOrg, k: 9 }),
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
        tableName: 'BDC',
        totalAmount: totalAmountForBdcs,
        all: getBdcRows({ ...allBdc, k: 0 }),
        sample10: getBdcRows({ ...allBdc, k: 9 }),
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
        // tableName: 'Seeds for GDC',
        tableName: 'GDC',
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

export const getDataChart = async function ({ dispatch, commit, state }, { tableId, compare }) {
  console.log('getDataChart function')
  let data

  let k = 0
  let rank = 0
  let increment = 0
  switch (compare) {
    case 1:
      k = 9
      increment = 10
      break
    case 2:
      k = 19
      increment = 20
      break
    default:
      k = 49
      increment = 50
      rank = 'last'
      break
  }

  switch (tableId) {
    case HarvestConstants.SEEDS_GROWN:
      data = {
        categories: Array.from({ length: state.simulationState.length - 1 }, (v, k) => k + 1),
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
      let series = [{
        name: 'Total Amount Per Rank (' + rank + ')',
        data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.peopleAccounts.all.totalAmount[0] })
      }]

      for (k; k < 100; k += increment) {
        if (typeof rank === 'string') {
          console.log('HAHSSFHSDJFHKSDFS', rank)
          if (k === 49) {
            rank = 'middle'
          } else {
            rank = 'first'
          }
        } else {
          rank = k
        }
        series.push({
          name: 'Total Amount Per Rank (' + rank + ')',
          data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.peopleAccounts.all.totalAmount[k] })
        })
      }

      data = {
        categories: Array.from({ length: state.simulationState.length - 1 }, (v, k) => k + 1),
        series: series,
        chartName: 'Seeds Individual Accounts'
      }
      // data = {
      //   categories: Array.from({ length: state.simulationState.length - 1 }, (v, k) => k + 1),
      //   series: [
      //     {
      //       name: 'Total Amount For People',
      //       data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.peopleAccounts.totalAmountForAccounts })
      //     },
      //     {
      //       name: 'Total Amount Per Rank (first)',
      //       data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.peopleAccounts.first.totalAmount }),
      //       visible: false
      //     },
      //     {
      //       name: 'Total Amount Per Rank (middle)',
      //       data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.peopleAccounts.middle.totalAmount }),
      //       visible: false
      //     },
      //     {
      //       name: 'Total Amount Per Rank (last)',
      //       data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.peopleAccounts.last.totalAmount }),
      //       visible: false
      //     }
      //   ],
      //   chartName: 'Seeds Individual Accounts'
      // }
      break
    case HarvestConstants.SEEDS_ORG_ACCNTS:
      let seriesOrg = [{
        name: 'Total Amount Per Rank (' + rank + ')',
        data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.organizationAccounts.allOrg.totalAmount[0] })
      }]

      for (k; k < 100; k += increment) {
        if (typeof rank === 'string') {
          if (k === 49) {
            rank = 'middle'
          } else {
            rank = 'first'
          }
        } else {
          rank = k
        }
        seriesOrg.push({
          name: 'Total Amount Per Rank (' + rank + ')',
          data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.organizationAccounts.allOrg.totalAmount[k] })
        })
      }

      data = {
        categories: Array.from({ length: state.simulationState.length - 1 }, (v, k) => k + 1),
        series: seriesOrg,
        chartName: 'Seeds Organization Accounts'
      }
      // data = {
      //   categories: Array.from({ length: state.simulationState.length - 1 }, (v, k) => k + 1),
      //   series: [
      //     {
      //       name: 'Total Amount For Organizations',
      //       data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.organizationAccounts.totalAmountForOrganizations })
      //     },
      //     {
      //       name: 'Total Amount per Rank (first)',
      //       data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.organizationAccounts.firstOrg.totalAmount }),
      //       visible: false
      //     },
      //     {
      //       name: 'Total Amount per Rank (middle)',
      //       data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.organizationAccounts.middleOrg.totalAmount }),
      //       visible: false
      //     },
      //     {
      //       name: 'Total Amount per Rank (last)',
      //       data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.organizationAccounts.lastOrg.totalAmount }),
      //       visible: false
      //     }
      //   ],
      //   chartName: 'Seeds Organization Accounts'
      // }
      break
    case HarvestConstants.SEEDS_BDC:
      let seriesBdc = [{
        name: 'Total Amount Per Rank (' + rank + ')',
        data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.bdcs.allBdc.budget[0] })
      }]

      for (k; k < 100; k += increment) {
        if (typeof rank === 'string') {
          if (k === 49) {
            rank = 'middle'
          } else {
            rank = 'first'
          }
        } else {
          rank = k
        }
        seriesBdc.push({
          name: 'Total Amount Per Rank (' + rank + ')',
          data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.bdcs.allBdc.budget[k] })
        })
      }

      data = {
        categories: Array.from({ length: state.simulationState.length - 1 }, (v, k) => k + 1),
        series: seriesBdc,
        chartName: 'Seeds BDCs Accounts'
      }
      // data = {
      //   categories: Array.from({ length: state.simulationState.length - 1 }, (v, k) => k + 1),
      //   series: [
      //     {
      //       name: 'Total Amount For BDC',
      //       data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.bdcs.totalAmountForBdcs })
      //     },
      //     {
      //       name: 'Total Amount Per Rank (first)',
      //       data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.bdcs.firstBdc.budget }),
      //       visible: false
      //     },
      //     {
      //       name: 'Total Amount Per Rank (middle)',
      //       data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.bdcs.middleBdc.budget }),
      //       visible: false
      //     },
      //     {
      //       name: 'Total Amount Per Rank (last)',
      //       data: state.simulationState.slice(1).map(s => { return s.harvestDistribution.bdcs.lastBdc.budget }),
      //       visible: false
      //     }
      //   ],
      //   chartName: 'Seeds BDCs'
      // }
      break
    case HarvestConstants.SEEDS_GDC:
      data = {
        categories: Array.from({ length: state.simulationState.length - 1 }, (v, k) => k + 1),
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
        categories: Array.from({ length: state.simulationState.length - 1 }, (v, k) => k + 1),
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

export const initState = async function ({ dispatch, commit, state }, { simulationState }) {
  let newState = initCycle(Object.assign({}, simulationState))

  commit('setDataSimulationState', { simulation: [newState], step: 0 })
  commit('setSimulationStep', state.simulationState.length - 1)

  return true
}

export const doCycle = async function ({ dispatch, commit, state }, { simulationState, step = -1 }) {
  // commit('general/setIsLoading', true, { root: true })
  if (step === -1) {
    step = state.simulationState.length
  }
  console.log('DoCycle Action')
  if (state.simulationState.length === 0) {
    console.log('DoCycle Action 1')
    let initState = initCycle(Object.assign({}, simulationState))
    let newState = doNextCycle(Object.assign({}, initState), true)
    console.log(newState)
    if (newState.error === 'negative') {
      commit('general/setErrorMsg', 'The field ' + newState.field + ' became negative during cycle calculation.', { root: true })
      return true
    }
    commit('setDataSimulationState', { simulation: [initState, newState], step: step })
    step = 1
    // console.log(JSON.stringify(state.simulationState[0]))
  } else {
    console.log('DoCycle Action 2')
    let newState = doNextCycle(Object.assign({}, simulationState), true)
    if (newState.error === 'negative') {
      commit('general/setErrorMsg', 'The field ' + newState.field + ' became negative during cycle calculation.', { root: true })
      return true
    }
    commit('setDataSimulationState', { simulation: [newState], step: step })
  }
  console.log('DoCycle Action 3')
  console.log('LOOK AT THAT:', state.simulationState.length - 1)
  setCycleTables({ dispatch, commit, state }, { step: state.simulationState.length - 1 })
  commit('setSimulationStep', state.simulationState.length - 1)
  // commit('general/setIsLoading', false, { root: true })
  // commit('setSimulationStep', state.simulationState.length - 1)
  // commit('setDataForm', simulationState)

  return true
}

export const getInitSimulationStep = async function ({ dispatch, commit, state }) {
  commit('setSimulationStep', state.simulationState.length)
  return true
}
