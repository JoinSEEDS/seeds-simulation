export default () => ({
  simulationState: [
    // data
    {
      circulatingSeeds: 1333561643.84,
      volumeGrowth: 0.025,
      changeRequiredToMeetDemand: 33339041.096,
      seedsDestroyed: 10000,
      plantedSeeds: 13335616.44,
      enterExchanges: 133356164.38,
      enterExchangesWeight: 0.1,
      enterSeedsBank: 0,
      seedsRemoved3Cycles: 26681232.878,
      unplantedSeeds: 1333561.64,
      exitExchanges: 66678082.19,
      exitExchangesWeight: 0.1,
      exitSeedsBank: 6667808.22,
      seedsIntroducedPrevious3Cycles: 14669178.079,
      seedsGrownPerCycle: 15117031.964999998,
      percentageOfHarvestAssignedCirculating: 0.5,
      percentageDistributionOfNewHarvest: { gdc: 0.3, bdc: 0.2, organizations: 0.2, accounts: 0.3 },
      maxPercentageAccounts: 0.012,
      maxPercentageOrganizations: 0.011,
      maxPercentageBdc: 0.013,
      bdcPercentagesDistribution: { regenGrants: 0.25, regenLoans: 0.25, openProposal: 0.5 },
      gdcPercentagesDistribution: {
        networkMaintenance: 0.15,
        regenGrants: 0.2,
        coreDevelopment: 0.45,
        interestFreeLoans: 0.2
      },
      numPeopleAccounts: 10000000,
      numOrganizationAccounts: 100000,
      numBdcs: 100,
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
  ],
  seedsGrownTable: [
    {
      seeds3cycles: 0,
      seedsPerCycle: 0,
      seedsPerBlock: 0
    }
  ],
  peopleAccountsTable: [ // people table
    {
      totalAmountForPeople: 4554005.87945625
    },
    {
      position: 'first',
      numberUsers: 0,
      totalAmount: 0,
      totalAmountPerUser: 0
    },
    {
      position: 'middle',
      numberUsers: 0,
      totalAmount: 0,
      totalAmountPerUser: 0
    },
    {
      position: 'last',
      numberUsers: 0,
      totalAmount: 0,
      totalAmountPerUser: 0
    }
  ],
  organizationAccountsTable: [ // organizations table
    {
      totalAmountForOrganizations: 0
    },
    {
      position: 'first',
      numberUsers: 0,
      totalAmount: 0,
      totalAmountPerOrganization: 0
    },
    {
      position: 'middle',
      numberUsers: 0,
      totalAmount: 0,
      totalAmountPerOrganization: 0
    },
    {
      position: 'last',
      numberUsers: 0,
      totalAmount: 0,
      totalAmountPerOrganization: 0
    }
  ],
  bdcsTable: [ // bdcs table
    {
      totalAmountPerBdc: 0
    },
    {
      position: 'first',
      numBdc: 0,
      budget: 0,
      budgetPerBdc: {
        totalAmount: 0,
        regenGrants: 0,
        regenLoans: 0,
        openProposal: 0
      }
    },
    {
      position: 'middle',
      numBdc: 0,
      budget: 0,
      budgetPerBdc: {
        totalAmount: 0,
        regenGrants: 0,
        regenLoans: 0,
        openProposal: 0
      }
    },
    {
      position: 'last',
      numBdc: 0,
      budget: 0,
      budgetPerBdc: {
        totalAmount: 0,
        regenGrants: 0,
        regenLoans: 0,
        openProposal: 0
      }
    }
  ],
  gdcTable: [
    {
      totalAmountForGdc: 0,
      networkMaintenance: 0,
      regenGrants: 0,
      coreDevelopment: 0,
      interestFreeLoans: 0
    }
  ],
  dataChart: {
    // Data for Chart 1
  },
  stateForm: {
    // Data to fill cycle form
  }

})
