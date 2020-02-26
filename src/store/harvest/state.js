export default () => ({
  simulationState: [],
  seedsGrownTable: {
    tableName: 'Seeds Grown'
  },
  peopleAccountsTable: {
    tableName: 'Seeds Distributed for Individual Accounts'
  },
  organizationAccountsTable: { tableName: 'Seeds Distributed for Organization Accounts' },
  bdcsTable: {
    tableName: 'Seeds Distributed for BDCs'
  },
  gdcTable: {
    tableName: 'Seeds for GDC'
  },
  dataChart: {
    // Data for Chart 1
  },
  stateForm: {
    // Data to fill cycle form
    circulatingSeeds: 1333561643.84,
    volumeGrowth: 0.025,
    // changeRequiredToMeetDemand: 33339041.096,
    seedsDestroyed: 10000,
    plantedSeeds: 13335616.44,
    enterExchanges: 133356164.38,
    enterExchangesWeight: 0.1,
    enterSeedsBank: 0,
    // seedsRemoved3Cycles: 26681232.878,
    unplantedSeeds: 1333561.64,
    exitExchanges: 66678082.19,
    exitExchangesWeight: 0.1,
    exitSeedsBank: 6667808.22,
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
    numPeopleAccounts: 10000000,
    numOrganizationAccounts: 100000,
    numBdcs: 100
  },
  simulationStep: 0
})
