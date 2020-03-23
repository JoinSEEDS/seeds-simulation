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
      regenGrants: percentages.regenGrants * budgetDistribution[99],
      regenLoans: percentages.regenLoans * budgetDistribution[99],
      openProposal: percentages.openProposal * budgetDistribution[99]
    },
    middleBdc: {
      numBdcs: accountsDistribution[49],
      budget: budgetDistribution[49],
      regenGrants: percentages.regenGrants * budgetDistribution[49],
      regenLoans: percentages.regenLoans * budgetDistribution[49],
      openProposal: percentages.openProposal * budgetDistribution[49]
    },
    lastBdc: {
      numBdcs: accountsDistribution[0],
      budget: budgetDistribution[0],
      regenGrants: percentages.regenGrants * budgetDistribution[0],
      regenLoans: percentages.regenLoans * budgetDistribution[0],
      openProposal: percentages.openProposal * budgetDistribution[0]
    },
    allBdc: {
      numBdcs: accountsDistribution,
      budget: budgetDistribution,
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

export const initCycle = function (state) {
  let newState = state

  newState.circulatingSeeds = (newState.gdpPerPerson * newState.numPeopleAccounts) + (newState.gdpPerOrganisation * newState.numOrganizationAccounts)
  newState.circulatingSeeds /= 365
  newState.circulatingSeeds *= 29.5 * 3

  newState.changeRequiredToMeetDemand = 0
  newState.seedsRemoved3Cycles = 0

  newState.seedsIntroducedPrevious3Cycles = 0
  newState.seedsGrownPerCycle = 0

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

  newState.changeRequiredToMeetDemand = newState.circulatingSeeds * newState.volumeGrowth
  newState.seedsRemoved3Cycles = newState.seedsDestroyed +
                    newState.plantedSeeds +
                    newState.enterExchanges * newState.enterExchangesWeight +
                    newState.enterSeedsBank

  newState.seedsIntroducedPrevious3Cycles = newState.unplantedSeeds +
                          newState.exitExchanges * newState.exitExchangesWeight +
                          newState.exitSeedsBank

  newState.seedsGrownPerCycle = newState.changeRequiredToMeetDemand +
                    newState.seedsRemoved3Cycles -
                    newState.seedsIntroducedPrevious3Cycles

  newState.seedsGrownPerCycle /= 3

  if (update) {
    newState.circulatingSeeds += newState.percentageOfHarvestAssignedCirculating * newState.seedsGrownPerCycle
  }

  newState.harvestDistribution = {
    peopleAccounts: distributeAccounts(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.accounts, newState.numPeopleAccounts),

    organizationAccounts: distributeOrganizations(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.organizations, newState.numOrganizationAccounts),

    bdcs: distributeBdc(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.bdc, newState.numBdcs, newState.bdcPercentagesDistribution),

    gdcs: distributeGdc(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.gdc, newState.gdcPercentagesDistribution)
  }

  return newState
}
