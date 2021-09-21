function getBudgetDistribution (budget, n) {
  let y = Array.from(Array(n).keys())
  let x = (2 * budget) / (n * (n + 1))

  for (let i = 1; i <= y.length; i++) {
    y[i - 1] = i * x
  }

  return y
}

function getRankingsDistribution (naccounts) {
  let ranking = Array(100)
  let pos = 0

  for (let i = 0; i < ranking.length; i++) {
    ranking[i] = 0
  }

  for (let i = 0; i < naccounts; i++) {
    pos = Math.floor((i * 100) / naccounts)
    ranking[pos] += 1
  }

  return ranking
}

function distributeAccounts (budget, numAccounts) {
  // this function should be modified
  let accountsDistribution = getRankingsDistribution(numAccounts)
  let budgetDistribution = getBudgetDistribution(budget, 100)

  return {
    totalAmountForAccounts: budget,
    first: {
      numberUsers: accountsDistribution[99],
      totalAmount: budgetDistribution[99],
      totalAmountPerUser: budgetDistribution[99] / accountsDistribution[99]
    },
    middle: {
      numberUsers: accountsDistribution[49],
      totalAmount: budgetDistribution[49],
      totalAmountPerUser: budgetDistribution[49] / accountsDistribution[49]
    },
    last: {
      numberUsers: accountsDistribution[0],
      totalAmount: budgetDistribution[0],
      totalAmountPerUser: budgetDistribution[0] / accountsDistribution[0]
    },
    all: {
      numberUsers: accountsDistribution,
      totalAmount: budgetDistribution,
      totalAmountPerUser: budgetDistribution.map((distribution, index) => {
        return distribution / accountsDistribution[index]
      })
    }
  }
}

function distributeOrganizations (budget, numAccounts) {
  // this function should be modified
  let accountsDistribution = getRankingsDistribution(numAccounts)
  let budgetDistribution = getBudgetDistribution(budget, 100)

  return {
    totalAmountForOrganizations: budget,
    firstOrg: {
      numberUsers: accountsDistribution[99],
      totalAmount: budgetDistribution[99],
      totalAmountPerUser: budgetDistribution[99] / accountsDistribution[99]
    },
    middleOrg: {
      numberUsers: accountsDistribution[49],
      totalAmount: budgetDistribution[49],
      totalAmountPerUser: budgetDistribution[49] / accountsDistribution[49]
    },
    lastOrg: {
      numberUsers: accountsDistribution[0],
      totalAmount: budgetDistribution[0],
      totalAmountPerUser: budgetDistribution[0] / accountsDistribution[0]
    },
    allOrg: {
      numberUsers: accountsDistribution,
      totalAmount: budgetDistribution,
      totalAmountPerUser: budgetDistribution.map((distribution, index) => {
        return distribution / accountsDistribution[index]
      })
    }
  }
}

function distributeBdc (budget, numAccounts, percentages) {
  let accountsDistribution = getRankingsDistribution(numAccounts)
  let budgetDistribution = getBudgetDistribution(budget, 100)

  return {
    totalAmountForBdcs: budget,
    firstBdc: {
      numBdcs: accountsDistribution[99],
      budget: budgetDistribution[99],
      budgetPerBdc: budgetDistribution[99] / accountsDistribution[99],
      regenGrants: percentages.regenGrants * budgetDistribution[99],
      regenLoans: percentages.regenLoans * budgetDistribution[99],
      openProposal: percentages.openProposal * budgetDistribution[99]
    },
    middleBdc: {
      numBdcs: accountsDistribution[49],
      budget: budgetDistribution[49],
      budgetPerBdc: budgetDistribution[49] / accountsDistribution[49],
      regenGrants: percentages.regenGrants * budgetDistribution[49],
      regenLoans: percentages.regenLoans * budgetDistribution[49],
      openProposal: percentages.openProposal * budgetDistribution[49]
    },
    lastBdc: {
      numBdcs: accountsDistribution[0],
      budget: budgetDistribution[0],
      budgetPerBdc: budgetDistribution[0] / accountsDistribution[0],
      regenGrants: percentages.regenGrants * budgetDistribution[0],
      regenLoans: percentages.regenLoans * budgetDistribution[0],
      openProposal: percentages.openProposal * budgetDistribution[0]
    },
    allBdc: {
      numBdcs: accountsDistribution,
      budget: budgetDistribution,
      budgetPerBdc: budgetDistribution.map((d, index) => { return d / accountsDistribution[index] }),
      regenGrants: budgetDistribution.map(d => { return percentages.regenGrants * d }),
      regenLoans: budgetDistribution.map(d => { return percentages.regenLoans * d }),
      openProposal: budgetDistribution.map(d => { return percentages.openProposal * d })
    }
  }
}

function distributeGdc (budget, percentages) {
  return {
    totalAmountForGdc: budget,
    networkMaintenance: percentages.networkMaintenance * budget,
    regenGrants: percentages.regenGrants * budget,
    coreDevelopment: percentages.coreDevelopment * budget,
    interestFreeLoans: percentages.interestFreeLoans * budget
  }
}

// globalDhoInfo: {
//   minimumVotePercentage: 0.1,
//   dhos: [
//     {
//       votePercentage: 0.2,
//       distPercentage: 0
//     }
//   ]
// }

function distributeDhos (budget, dhos) {
  return dhos.map(dho => {
    return {
      distAmount: budget * dho.distPercentage
    }
  })
}

function isNegative (amount) {
  if (amount < 0) {
    return true
  }
  return false
}

export const calcDhoDistPercentages = function (globalDhoInfo) {
  console.log('globalDhoInfo:', globalDhoInfo)

  const newGlobalDhoInfo = { ...globalDhoInfo }
  const { minimumVotePercentage, dhos } = newGlobalDhoInfo

  console.log(minimumVotePercentage, dhos)
  const totalPercentage = dhos.map(dho => dho.votePercentage).reduce((acc, curr) => Number(acc) + Number(curr), 0)
  if (Math.abs(1.0 - totalPercentage) >= 0.001) {
    return {
      error: 'InvalidPercentage',
      field: 'Total dhos vote percentages'
    }
  }

  const totalValidPercentage = dhos.filter(dho => dho.votePercentage >= minimumVotePercentage).map(dho => dho.votePercentage).reduce((acc, curr) => Number(acc) + Number(curr), 0)
  const newDhos = dhos.map(dho => {
    dho.distPercentage = (dho.votePercentage >= minimumVotePercentage) ? dho.votePercentage / totalValidPercentage : 0
    return dho
  })

  newGlobalDhoInfo.dhos = newDhos

  return newGlobalDhoInfo
}

export const initCycle = function (state) {
  const newState = { ...state }

  newState.totalGDP = (newState.numPeopleAccounts * newState.gdpPerPerson) + (newState.numOrganizationAccounts * newState.gdpPerOrganisation)

  newState.changeRequiredToMeetDemand = 0
  newState.seedsRemovedDuringCycle = 0

  newState.seedsIntroducedDuringCycle = 0
  newState.seedsGrownPerCycle = 0

  newState.newContractsDuringCycle = 0

  newState.outstandingContractsSeeds = 0
  newState.outstandingContracts = Math.floor(newState.outstandingContractsSeeds / newState.seedsPerContract)

  newState.totals = {
    circulatingSeeds: 1256637061,
    plantedSeeds: 1256637061,
    burnedSeeds: 0,
    seeds: 3141592653
  }

  newState.globalDhoInfo = calcDhoDistPercentages({
    minimumVotePercentage: 0.1,
    dhos: [
      {
        votePercentage: 0.8,
        distPercentage: 0
      },
      {
        votePercentage: 0.2,
        distPercentage: 0
      }
    ]
  })

  console.log('new global calculated:', newState.globalDhoInfo)
  console.log(newState.globalDhoInfo.dhos)

  newState.harvestDistribution = {
    peopleAccounts: distributeAccounts(0, newState.numPeopleAccounts),
    organizationAccounts: distributeOrganizations(0, newState.numOrganizationAccounts),
    bdcs: distributeBdc(0, newState.numBdcs, newState.bdcPercentagesDistribution),
    gdcs: distributeGdc(0, newState.gdcPercentagesDistribution),
    dhos: distributeDhos(0, newState.globalDhoInfo.dhos)
  }

  return newState
}

export const doNextCycle = function (state, update) {
  let newState = { ...state }

  let newAccountsNum = Math.floor(newState.numPeopleAccounts * newState.peopleGrowth)

  newState.numPeopleAccounts += newAccountsNum
  if (isNegative(newState.numPeopleAccounts)) {
    return {
      error: 'negative',
      field: 'Number of People Accounts'
    }
  }

  newState.numOrganizationAccounts += Math.floor(newState.numOrganizationAccounts * newState.organizationsGrowth)
  if (isNegative(newState.numOrganizationAccounts)) {
    return {
      error: 'negative',
      field: 'Number of Organisations'
    }
  }

  newState.numBdcs += Math.floor(newState.numBdcs * newState.bdcsGrowth)
  if (isNegative(newState.numBdcs)) {
    return {
      error: 'negative',
      field: 'Number of Bioregions'
    }
  }

  let pastGDP = newState.totalGDP

  newState.peopleGrowthLabel = newState.numPeopleAccounts * newState.gdpPerPerson

  newState.organizationsGrowthLabel = newState.numOrganizationAccounts * newState.gdpPerOrganisation

  newState.totalGDP = newState.peopleGrowthLabel + newState.organizationsGrowthLabel

  newState.volumeGrowth = (newState.totalGDP - pastGDP) / pastGDP

  // change required to meet demand
  newState.changeRequiredToMeetDemand = newState.totals.circulatingSeeds * newState.volumeGrowth

  // planted seeds
  newState.plantedSeedsDuringCycle = (newState.seedsPlantedPerUserFixed * newAccountsNum) +
                                     (newState.seedsPlantedPerUserVariable * newState.numPeopleAccounts)

  if (newState.plantedSeedsDuringCycle < 0) {
    newState.plantedSeedsDuringCycle = 0
  }

  // burned amount
  newState.burnedSeedsDuringCycle = newState.averageSeedsBurnedPerUser * newState.numPeopleAccounts

  // unplanted seeds
  newState.unplantedSeeds = newState.unplantedSeedsPerUser * newState.numPeopleAccounts

  // bank contracts
  newState.newContractsDuringCycleSeeds = newState.contractsGrowth * newState.changeRequiredToMeetDemand
  newState.newContractsDuringCycle = Math.floor(newState.newContractsDuringCycleSeeds / newState.seedsPerContract)

  if (newState.newContractsDuringCycleSeeds < 0) {
    newState.newContractsDuringCycleSeeds = 0
    newState.newContractsDuringCycle = 0
  }

  console.log(`Outstanding contracts: ${newState.outstandingContracts} closedContractsPercentage:${newState.closedContractsPercentage}`)
  newState.closedContractsDuringCycleSeeds = newState.outstandingContracts * newState.closedContractsPercentage
  newState.closedContractsDuringCycle = Math.floor(newState.closedContractsDuringCycleSeeds / newState.seedsPerContract)

  newState.bankContractsDuringCycle = newState.newContractsDuringCycle - newState.closedContractsDuringCycle
  newState.bankContractsDuringCycleSeeds = newState.newContractsDuringCycleSeeds - newState.closedContractsDuringCycleSeeds

  newState.outstandingContracts += newState.bankContractsDuringCycle
  newState.outstandingContractsSeeds += newState.bankContractsDuringCycleSeeds

  // enter exchanges
  newState.enterExchangesLabel = newState.enterExchanges * newState.enterExchangesWeight

  // exit exchanges
  newState.exitExchangesLabel = newState.exitExchanges * newState.exitExchangesWeight

  // seeds removed
  newState.seedsRemovedDuringCycle = newState.burnedSeedsDuringCycle +
                                newState.plantedSeedsDuringCycle +
                                newState.enterExchangesLabel +
                                newState.closedContractsDuringCycleSeeds

  // seeds introduced
  newState.seedsIntroducedDuringCycle = newState.unplantedSeeds +
                                newState.exitExchangesLabel +
                                newState.newContractsDuringCycleSeeds

  // harvest
  newState.seedsGrownPerCycle = newState.changeRequiredToMeetDemand +
                    newState.seedsRemovedDuringCycle -
                    newState.seedsIntroducedDuringCycle +
                    newState.newContractsDuringCycleSeeds -
                    newState.closedContractsDuringCycleSeeds

  // newState.seedsGrownPerCycle /= 3 // is this still correct?

  let pastCirculatingSeeds = newState.totals.circulatingSeeds

  let totalCirculatingSeeds = newState.totals.circulatingSeeds + newState.changeRequiredToMeetDemand
  if (isNegative(totalCirculatingSeeds)) {
    return {
      error: 'negative',
      field: 'Total Circulating Seeds'
    }
  }

  let pastPlantedSeeds = newState.totals.plantedSeeds
  let pastBurnedSeeds = newState.totals.burnedSeeds
  let pastTotalSeeds = newState.totals.seeds

  let totalPlantedSeeds = newState.totals.plantedSeeds + newState.plantedSeedsDuringCycle
  let totalBurnedSeeds = newState.totals.burnedSeeds + newState.burnedSeedsDuringCycle

  let totalSeeds = newState.totals.seeds + 2 * newState.seedsIntroducedDuringCycle + newState.seedsGrownPerCycle - newState.burnedSeedsDuringCycle

  // totals
  newState.totals = {
    circulatingSeeds: totalCirculatingSeeds,
    plantedSeeds: totalPlantedSeeds,
    burnedSeeds: totalBurnedSeeds,
    seeds: totalSeeds
  }

  console.info('---------------------------------------------------------------------------')
  console.info('-------------------            FORMULAS USED            -------------------')
  console.info('---------------------------------------------------------------------------')
  console.info('')
  console.info('VOLUME GROWTH:')
  console.info('Volume Growth = ( (Current Total GDP) - (Past Total GDP) ) / (Past Total GDP)')
  console.info('\tVolume Growth =', newState.volumeGrowth)
  console.info('\tCurrent Total GDP =', newState.totalGDP)
  console.info('\tPast Total GDP =', pastGDP)
  console.info('')
  console.info('')
  console.info('CHANGE REQUIRED TO MEET DEMAND:')
  console.info('Change Required to Meet Demand = (Circulating Seeds) * (Volume Growth)')
  console.info('\tChange Required to Meet Demand =', newState.changeRequiredToMeetDemand)
  console.info('\tCirculating Seeds =', newState.totals.circulatingSeeds)
  console.info('\tVolume Growth =', newState.volumeGrowth)
  console.info('')
  console.info('')
  console.info('SEEDS REMOVED DURING CYCLE:')
  console.info('Seeds Removed During Cycle = (Burned Seeds During Cycle) + (Planted Seeds During Cycle) + (Enter Exchanges * Weight) + (Closed Contracts During Cycle (in Seeds))')
  console.info('\tSeeds Removed During Cycle =', newState.seedsRemovedDuringCycle)
  console.info('\tBurned Seeds During Cycle =', newState.burnedSeedsDuringCycle)
  console.info('\tPlanted Seeds During Cycle =', newState.plantedSeedsDuringCycle)
  console.info('\tEnter Exchanges (times weight) =', newState.enterExchangesLabel)
  console.info('\tClosed Contracts During Cycles (in seeds) =', newState.closedContractsDuringCycleSeeds)
  console.info('')
  console.info('')
  console.info('SEEDS INTRODUCED DURING CYCLE:')
  console.info('Seeds Introduced During Cycle = (Unplanted Seeds) + (Exit Exchanges * Weight) + (New Contracts During Cycle (in Seeds))')
  console.info('\tSeeds Introduced During Cycle =', newState.seedsIntroducedDuringCycle)
  console.info('\tUnplanted Seeds =', newState.unplantedSeeds)
  console.info('\tExit Exchanges (times weight) =', newState.exitExchangesLabel)
  console.info('\tNew Contracts During Cycle (in Seeds) =', newState.newContractsDuringCycleSeeds)
  console.info('')
  console.info('')
  console.info('SEEDS GROWN PER CYCLE (aka HARVEST):')
  console.info('Seeds Grown per Cycle (aka Harvest) = (Change Required to Meet Demand) + (Seeds Removed During Cycle) - (Seeds Introduced During Cycle) + (New Contracts During Cycle) - (Closed Contracts During Cycle)')
  console.info('\tSeeds Grown per Cycle =', newState.seedsGrownPerCycle)
  console.info('\tChange Required to Meet Demand =', newState.changeRequiredToMeetDemand)
  console.info('\tSeeds Removed During Cycle =', newState.seedsRemovedDuringCycle)
  console.info('\tSeeds Introduced During Cycle =', newState.seedsIntroducedDuringCycle)
  console.info('\tNew Contracts During Cycle (in Seeds) =', newState.newContractsDuringCycleSeeds)
  console.info('\tClosed Contracts During Cycle (in Seeds) =', newState.closedContractsDuringCycleSeeds)
  console.info('')
  console.info('')
  console.info('CIRCULATING SEEDS:')
  console.info('Circulating Seeds = (Past Circulating Seeds) + (Change Required to Meet Demand)')
  console.info('\tCirculating Seeds =', totalCirculatingSeeds)
  console.info('\tPast Circulating Seeds =', pastCirculatingSeeds)
  console.info('\tChange Required to Meet Demand =', newState.changeRequiredToMeetDemand)
  console.info('')
  console.info('')
  console.info('PLANTED SEEDS:')
  console.info('Planted Seeds = (Past Planted Seeds) + (Planted Seeds During Cycle)')
  console.info('\tPlanted Seeds =', totalPlantedSeeds)
  console.info('\tPast Planted Seeds =', pastPlantedSeeds)
  console.info('\tPlanted Seeds During Cycle =', newState.plantedSeedsDuringCycle)
  console.info('')
  console.info('')
  console.info('BURNED SEEDS:')
  console.info('Burned Seeds = (Past Burned Seeds) + (Burned Seeds During Cycle)')
  console.info('\tBurned Seeds =', totalBurnedSeeds)
  console.info('\tPast Burned Seeds =', pastBurnedSeeds)
  console.info('\tBurned Seeds During Cycle =', newState.burnedSeedsDuringCycle)
  console.info('')
  console.info('')
  console.info('TOTAL SEEDS SUPPLY:')
  console.info('Total Supply = (Past Total Supply) + (2 * Seeds Introduced During Cycle) + (Seeds Grown Per Cycle) - (Burned Seeds During Cycle)')
  console.info('\tTotal Supply =', totalSeeds)
  console.info('\tPast Total Supply =', pastTotalSeeds)
  console.info('\t2 * Seeds Introduced During Cycle =', 2 * newState.seedsIntroducedDuringCycle)
  console.info('\tSeeds Grown Per Cycle =', newState.seedsGrownPerCycle)
  console.info('\tBurned Seeds During Cycle =', newState.burnedSeedsDuringCycle)
  console.info('\t')
  console.info('')
  console.info('---------------------------------------------------------------------------')
  console.info('---------------------------------------------------------------------------')

  // harvest distribution
  newState.harvestDistribution = {
    peopleAccounts: distributeAccounts(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.accounts, newState.numPeopleAccounts),
    organizationAccounts: distributeOrganizations(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.organizations, newState.numOrganizationAccounts),
    bdcs: distributeBdc(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.bdc, newState.numBdcs, newState.bdcPercentagesDistribution),
    gdcs: distributeGdc(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.gdc, newState.gdcPercentagesDistribution),
    dhos: distributeDhos(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.dhos, newState.globalDhoInfo.dhos)
  }

  return newState
}
