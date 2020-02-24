function getPercentagesDistribution (maxPercentage) {
  if (maxPercentage < 0.01) return
  if (0.01 - (maxPercentage - 0.01) < 0) return

  let x = Array.from(Array(100).keys())
  let y = new Array(100)
  let b = 0
  let m = 0
  b = 0.01 - (maxPercentage - 0.01)
  m = (maxPercentage - b) / (99 - 0)

  for (let i = 0; i < x.length; i++) {
    y[i] = m * x[i] + b
    y[i] = parseFloat(y[i].toFixed(4))
  }

  return [y[0], y[49], y[99]]
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

  return [ranking[0], ranking[49], ranking[99]]
}

function distributeAccounts (budget, numAccounts, maxPercentage) {
  // this function should be modified
  let accountsDistribution = getRankingsDistribution(numAccounts)
  let percentagesDistribution = getPercentagesDistribution(maxPercentage)

  return {
    totalAmountForAccounts: budget,
    first: {
      numberUsers: accountsDistribution[2],
      totalAmount: budget * percentagesDistribution[2],
      totalAmountPerUser: (budget * percentagesDistribution[2]) / accountsDistribution[2]
    },
    middle: {
      numberUsers: accountsDistribution[1],
      totalAmount: budget * percentagesDistribution[1],
      totalAmountPerUser: (budget * percentagesDistribution[1]) / accountsDistribution[1]
    },
    last: {
      numberUsers: accountsDistribution[0],
      totalAmount: budget * percentagesDistribution[0],
      totalAmountPerUser: (budget * percentagesDistribution[0]) / accountsDistribution[0]
    }
  }
}

function distributeOrganizations (budget, numAccounts, maxPercentage) {
  // this function should be modified
  let accountsDistribution = getRankingsDistribution(numAccounts)
  let percentagesDistribution = getPercentagesDistribution(maxPercentage)

  return {
    totalAmountForOrganizations: budget,
    first: {
      numberUsers: accountsDistribution[2],
      totalAmount: budget * percentagesDistribution[2],
      totalAmountPerUser: (budget * percentagesDistribution[2]) / accountsDistribution[2]
    },
    middle: {
      numberUsers: accountsDistribution[1],
      totalAmount: budget * percentagesDistribution[1],
      totalAmountPerUser: (budget * percentagesDistribution[1]) / accountsDistribution[1]
    },
    last: {
      numberUsers: accountsDistribution[0],
      totalAmount: budget * percentagesDistribution[0],
      totalAmountPerUser: (budget * percentagesDistribution[0]) / accountsDistribution[0]
    }
  }
}

function distributeBdc (budget, numAccounts, maxPercentage, percentages) {
  let accountsDistribution = getRankingsDistribution(numAccounts)
  let percentagesDistribution = getPercentagesDistribution(maxPercentage)

  return {
    totalAmountForBdcs: budget,
    first: {
      numBdcs: accountsDistribution[2],
      budget: budget * percentagesDistribution[2],
      budgetPerBdc: {
        totalAmount: budget * percentagesDistribution[2] / accountsDistribution[2],
        regenGrants: percentages.regenGrants * (budget * percentagesDistribution[2] / accountsDistribution[2]),
        regenLoans: percentages.regenLoans * (budget * percentagesDistribution[2] / accountsDistribution[2]),
        openProposal: percentages.openProposal * (budget * percentagesDistribution[2] / accountsDistribution[2])
      }
    },
    middle: {
      numBdcs: accountsDistribution[1],
      budget: budget * percentagesDistribution[1],
      budgetPerBdc: {
        totalAmount: budget * percentagesDistribution[1] / accountsDistribution[1],
        regenGrants: percentages.regenGrants * (budget * percentagesDistribution[1] / accountsDistribution[1]),
        regenLoans: percentages.regenLoans * (budget * percentagesDistribution[1] / accountsDistribution[1]),
        openProposal: percentages.openProposal * (budget * percentagesDistribution[1] / accountsDistribution[1])
      }
    },
    last: {
      numBdcs: accountsDistribution[0],
      budget: budget * percentagesDistribution[0],
      budgetPerBdc: {
        totalAmount: budget * percentagesDistribution[0] / accountsDistribution[0],
        regenGrants: percentages.regenGrants * (budget * percentagesDistribution[0] / accountsDistribution[0]),
        regenLoans: percentages.regenLoans * (budget * percentagesDistribution[0] / accountsDistribution[0]),
        openProposal: percentages.openProposal * (budget * percentagesDistribution[0] / accountsDistribution[0])
      }
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
    peopleAccounts: distributeAccounts(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.accounts, newState.numPeopleAccounts, newState.maxPercentageAccounts),

    organizationAccounts: distributeOrganizations(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.organizations, newState.numOrganizationAccounts, newState.maxPercentageOrganizations),

    bdcs: distributeBdc(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.bdc, newState.numBdcs, newState.maxPercentageBdc, newState.bdcPercentagesDistribution),

    gdcs: distributeGdc(newState.seedsGrownPerCycle * newState.percentageDistributionOfNewHarvest.gdc, newState.gdcPercentagesDistribution)
  }

  return newState
}
