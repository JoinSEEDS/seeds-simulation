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

function isNegative (amount) {
  if (amount < 0) {
    return true
  }
  return false
}

export const initCycle = function (state) {
  let newState = state

  newState.totalGDP = (newState.numPeopleAccounts * newState.gdpPerPerson) + (newState.numOrganizationAccounts * newState.gdpPerOrganisation)

  newState.changeRequiredToMeetDemand = 0
  newState.seedsRemovedDuringCycle = 0

  newState.seedsIntroducedDuringCycle = 0
  newState.seedsGrownPerCycle = 0

  newState.newContractsDuringCycle = 0

  newState.totalOpenSeedsBankContracts = 0

  let circulatingSeeds = (newState.totalGDP * 29.5) / 365
  let plantedSeeds = (newState.seedsPlantedPerUserFixed + newState.seedsPlantedPerUserVariable) * newState.numPeopleAccounts
  let burnedSeeds = newState.averageSeedsBurnedPerUser * newState.numPeopleAccounts

  newState.totals = {
    circulatingSeeds: circulatingSeeds - plantedSeeds,
    plantedSeeds: plantedSeeds,
    burnedSeeds: burnedSeeds,
    seeds: circulatingSeeds
  }

  newState.harvestDistribution = {
    peopleAccounts: distributeAccounts(0, newState.numPeopleAccounts),

    organizationAccounts: distributeOrganizations(0, newState.numOrganizationAccounts),

    bdcs: distributeBdc(0, newState.numBdcs, newState.bdcPercentagesDistribution),

    gdcs: distributeGdc(0, newState.gdcPercentagesDistribution)
  }

  return newState
}

export const doNextCycle = function (state, update) {
  let newState = state

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
      field: 'Number of Organization Accounts'
    }
  }

  newState.numBdcs += Math.floor(newState.numBdcs * newState.bdcsGrowth)
  if (isNegative(newState.numBdcs)) {
    return {
      error: 'negative',
      field: 'Number of BDCs'
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

  if (newState.newContractsDuringCycle < 0) {
    newState.newContractsDuringCycle = 0
  }

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
                    newState.newContractsDuringCycle -
                    newState.closedContractsDuringCycle

  // newState.seedsGrownPerCycle /= 3 // is this still correct?

  let totalCirculatingSeeds = newState.totals.circulatingSeeds + newState.percentageOfHarvestAssignedCirculating * newState.seedsGrownPerCycle
  if (isNegative(totalCirculatingSeeds)) {
    return {
      error: 'negative',
      field: 'Total Circulating Seeds'
    }
  }

  let totalPlantedSeeds = newState.totals.plantedSeeds + newState.plantedSeedsDuringCycle
  let totalBurnedSeeds = newState.totals.burnedSeeds + newState.burnedSeedsDuringCycle

  let totalSeeds = newState.totals.seeds + newState.seedsIntroducedDuringCycle +
                  newState.seedsRemovedDuringCycle + newState.seedsGrownPerCycle - newState.burnedSeedsDuringCycle

  // totals
  newState.totals = {
    circulatingSeeds: totalCirculatingSeeds,
    plantedSeeds: totalPlantedSeeds,
    burnedSeeds: totalBurnedSeeds,
    seeds: totalSeeds
  }

  // harvest distribution
  newState.harvestDistribution = {
    peopleAccounts: distributeAccounts(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.accounts, newState.numPeopleAccounts),

    organizationAccounts: distributeOrganizations(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.organizations, newState.numOrganizationAccounts),

    bdcs: distributeBdc(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.bdc, newState.numBdcs, newState.bdcPercentagesDistribution),

    gdcs: distributeGdc(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.gdc, newState.gdcPercentagesDistribution)
  }

  return newState
}
