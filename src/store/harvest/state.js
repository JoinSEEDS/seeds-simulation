export default () => ({
  simulationState: [],
  generalStatsTable: {
    tableName: 'General Information',
    rows: [
      {
        totalCirculatingSeeds: 1256637061,
        totalSeedsPlanted: 1256637061,
        totalSeedsBurned: 0,
        totalSeeds: 3141592653
      }
    ]
  },
  generalStatesInitTable: {
    tableName: 'Init Seeds',
    data: {
      totalCirculatingSeeds: 1256637061,
      totalSeedsPlanted: 1256637061,
      totalSeedsBurned: 0,
      totalSeeds: 3141592653,
      totalGEV: 1000
    }
  },
  seedsGrownTable: {
    tableName: 'Seeds Grown'
  },
  peopleAccountsTable: {
    tableName: 'People Accounts',
    expand: false
  },
  organizationAccountsTable: {
    tableName: 'Organizations Accounts',
    expand: false
  },
  bdcsTable: {
    tableName: 'R-DHO',
    // tableName: 'Seeds Distributed for BDCs',
    expanded: false
  },
  gdcTable: {
    // tableName: 'Seeds for G-DHO'
    tableName: 'G-DHO'
  },
  dataChart: {
    chartName: 'undefined'
  },
  stateForm2: {
    // Data to fill cycle form
    circulatingSeeds: 1333561643.84,
    volumeGrowth: 0.025,
    // changeRequiredToMeetDemand: 33339041.096,
    seedsDestroyed: 10000,
    plantedSeeds: 13335616.44,
    enterExchanges: 0,
    enterExchangesWeight: 0,
    enterSeedsBank: 0,
    // seedsRemoved3Cycles: 26681232.878,
    unplantedSeeds: 1333561.64,
    exitExchanges: 0,
    exitExchangesWeight: 0,
    exitSeedsBank: 0,
    percentageOfHarvestAssignedCirculating: 0.5,
    // Interface - START percentageDistributionOfNewHarvest
    gdc: 0.3,
    bdc: 0.2,
    organizations: 0.2,
    accounts: 0.3,
    // -END
    maxPercentageAccounts: 0.012,
    maxPercentageOrganizations: 0.011,
    maxPercentageBdc: 0.013,
    // Interface - Start bdcPercentagesDistribution
    regenGrantsBDC: 0.25,
    regenLoans: 0.25,
    openProposal: 0.5,
    // -END
    // Interface - Start gdcPercentagesDistribution
    networkMaintenance: 0.15,
    regenGrantsGDC: 0.2,
    coreDevelopment: 0.45,
    interestFreeLoans: 0.2,
    // -END
    numPeopleAccounts: 1000000,
    numOrganizationAccounts: 100000,
    numBdcs: 100
  },
  simulationStep: 0,
  stateForm: {
    circulatingSeeds: 1341120159.8225,
    volumeGrowth: 0,
    seedsDestroyed: 10000,
    plantedSeeds: 13335616.44,
    enterExchanges: 0,
    enterExchangesWeight: 0,
    enterSeedsBank: 0,
    unplantedSeeds: 0,
    exitExchanges: 0,
    exitExchangesWeight: 0,
    exitSeedsBank: 0,
    percentageOfHarvestAssignedCirculating: 0.5,
    percentageDistributionOfNewHarvest: {
      gdc: 0.3,
      bdc: 0.2,
      organizations: 0.2,
      accounts: 0.3
    },
    maxPercentageAccounts: 0.012,
    maxPercentageOrganizations: 0.011,
    maxPercentageBdc: 0.013,
    bdcPercentagesDistribution: {
      regenGrants: 0.25,
      regenLoans: 0.25,
      openProposal: 0.5
    },
    gdcPercentagesDistribution: {
      networkMaintenance: 0.15,
      regenGrants: 0.2,
      coreDevelopment: 0.45,
      interestFreeLoans: 0.2
    },
    numPeopleAccounts: 1000000,
    peopleGrowth: 0.025,
    gdpPerPerson: 3000,
    numOrganizationAccounts: 100000,
    organizationsGrowth: 0.018,
    gdpPerOrganisation: 25000,
    // (gdpPerPerson * numPeopleAccounts) +  (gdpPerOrganisation * numOrganizationAccounts)
    numBdcs: 100,
    bdcsGrowth: 0.012,
    changeRequiredToMeetDemand: 0,
    seedsRemovedDuringCycle: 0,
    seedsIntroducedDuringCycle: 0,
    seedsGrownPerCycle: 0,
    newContractsDuringCycle: 0,
    outstandingContractsSeeds: 0,
    contractsGrowth: 0,
    outstandingContracts: 0,
    closedContracts: 0,
    closedContractsPercentage: 0,
    seedsPerContract: 1,
    totalGDP: 0,
    seedsPlantedPerUserFixed: 50,
    seedsPlantedPerUserVariable: 30,
    averageSeedsBurnedPerUser: 10,
    totals: {
      circulatingSeeds: 0,
      plantedSeeds: 0,
      burnedSeeds: 0,
      seeds: 0
    },
    globalDhoInfo: {
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
    },
    harvestDistribution: {
      peopleAccounts: {
        totalAmountForAccounts: 4535109.589499999,
        first: {
          numberUsers: 100000,
          totalAmount: 54421.315073999984,
          totalAmountPerUser: 0.5442131507399999
        },
        middle: {
          numberUsers: 100000,
          totalAmount: 45351.09589499999,
          totalAmountPerUser: 0.45351095894999993
        },
        last: {
          numberUsers: 100000,
          totalAmount: 36280.87671599999,
          totalAmountPerUser: 0.36280876715999993
        }
      },
      organizationAccounts: {
        totalAmountForOrganizations: 3023406.3929999997,
        first: {
          numberUsers: 1000,
          totalAmount: 33257.470322999994,
          totalAmountPerUser: 33.25747032299999
        },
        middle: {
          numberUsers: 1000,
          totalAmount: 30234.063929999997,
          totalAmountPerUser: 30.234063929999998
        },
        last: {
          numberUsers: 1000,
          totalAmount: 27210.657536999996,
          totalAmountPerUser: 27.210657536999996
        }
      },
      bdcs: {
        totalAmountForBdcs: 3023406.3929999997,
        first: {
          numBdcs: 1,
          budget: 39304.283108999996,
          budgetPerBdc: {
            totalAmount: 39304.283108999996,
            regenGrants: 9826.070777249999,
            regenLoans: 9826.070777249999,
            openProposal: 19652.141554499998
          }
        },
        middle: {
          numBdcs: 1,
          budget: 30234.063929999997,
          budgetPerBdc: {
            totalAmount: 30234.063929999997,
            regenGrants: 7558.515982499999,
            regenLoans: 7558.515982499999,
            openProposal: 15117.031964999998
          }
        },
        last: {
          numBdcs: 1,
          budget: 21163.844750999997,
          budgetPerBdc: {
            totalAmount: 21163.844750999997,
            regenGrants: 5290.961187749999,
            regenLoans: 5290.961187749999,
            openProposal: 10581.922375499998
          }
        }
      },
      gdcs: {
        totalAmountForGdc: 4535109.589499999,
        networkMaintenance: 680266.4384249998,
        regenGrants: 907021.9178999998,
        coreDevelopment: 2040799.3152749995,
        interestFreeLoans: 907021.9178999998
      }
    }
  }
})
