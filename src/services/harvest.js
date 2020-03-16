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

function distributeBdc (budget, numAccounts, percentages) {
  let accountsDistribution = getRankingsDistribution(numAccounts)
  let budgetDistribution = getBudgetDistribution(budget, 100)

  let amountFirst = budgetDistribution[99] / accountsDistribution[99]
  let amountMiddle = budgetDistribution[49] / accountsDistribution[49]
  let amountLast = budgetDistribution[0] / accountsDistribution[0]

  return {
    totalAmountForBdcs: budget,
    first: {
      numBdcs: accountsDistribution[99],
      budget: budgetDistribution[99],
      budgetPerBdc: {
        totalAmount: amountFirst,
        regenGrants: percentages.regenGrants * amountFirst,
        regenLoans: percentages.regenLoans * amountFirst,
        openProposal: percentages.openProposal * amountFirst
      }
    },
    middle: {
      numBdcs: accountsDistribution[49],
      budget: budgetDistribution[49],
      budgetPerBdc: {
        totalAmount: amountMiddle,
        regenGrants: percentages.regenGrants * amountMiddle,
        regenLoans: percentages.regenLoans * amountMiddle,
        openProposal: percentages.openProposal * amountMiddle
      }
    },
    last: {
      numBdcs: accountsDistribution[0],
      budget: budgetDistribution[0],
      budgetPerBdc: {
        totalAmount: amountLast,
        regenGrants: percentages.regenGrants * amountLast,
        regenLoans: percentages.regenLoans * amountLast,
        openProposal: percentages.openProposal * amountLast
      }
    },
    all: {
      numBdcs: accountsDistribution,
      budget: budgetDistribution,
      budgetPerBdc: budgetDistribution.map((distribution, index) => {
        return {
          totalAmount: distribution / accountsDistribution[index],
          regenGrants: percentages.regenGrants * distribution,
          regenLoans: percentages.regenLoans * distribution,
          openProposal: percentages.openProposal * distribution
        }
      })
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

  newState.changeRequiredToMeetDemand = 0
  newState.seedsRemoved3Cycles = 0

  newState.seedsIntroducedPrevious3Cycles = 0
  newState.seedsGrownPerCycle = 0

  newState.harvestDistribution = {
    peopleAccounts: 0,
    organizationAccounts: 0,
    bdcs: 0,
    gdcs: 0
  }
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
