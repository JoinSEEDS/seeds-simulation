export default {
  common: {
    appName: 'Seeds Simulation',
    buttons: {
      cancel: 'Cancel',
      continue: 'Continue',
      create: 'Create',
      logout: 'Logout',
      mint: 'Mint',
      register: 'Register',
      save: 'Save',
      confirm: 'Confirm',
      delete: 'Delete',
      load: 'Load'
    },
    defaultTitle: 'Title'
  },
  forms: {
    errors: {
      accountFormat: 'The account can contain lowercase characters only, numbers from 1 to 5 or a dot (.)',
      accountFormatBasic: 'The account must contain 12 lowercase characters only and number from 1 to 5',
      accountLength: 'The account must contain at most 12 characters',
      accountNotAvailable: 'The account "{account}" already exists',
      accountNotExists: 'The account "{account}" does not exist',
      copyKey: 'Copy the key to a safe place',
      dateFuture: 'The date must be in the future',
      greaterOrEqualThan: 'The value must be greater than than or equal to {value}',
      integer: 'Please type an integer',
      phoneFormat: 'Please type a valid phone',
      positiveInteger: 'The value must be greater than 0',
      required: 'This field is required',
      token: 'The field must contain between 2 and 6 characters',
      tokenDecimals: 'The decimals must be between 2 and 9',
      nonNegative: 'The value can not be negative'
    },
    cycles: {
      chartOptions: 'Number of samples',
      changeRequiredToMeetDemand: 'Change Required to Meet Demand',
      volumeGrowth: 'Volume Growth',
      // changeRequiredToMeetDemand: 33339041.096,
      planted: 'Planted',
      unplanted: 'Unplanted',
      burned: 'Burned',
      seedsDestroyed: 'Seeds Burned During Cycle',
      plantedSeeds: 'Planted Seeds During Cycle',
      enterExchanges: 'Enter Exchanges',
      enterExchangesWeight: 'Enter Exchanges Weight',
      enterSeedsBank: 'Enter Seeds Bank',
      // seedsRemoved3Cycles: 26681232.878,
      unplantedSeeds: 'Unplanted Seeds During Cycle',
      unplantedSeedsPerUser: 'Unplanted Seeds Per User',
      exitExchanges: 'Exit Exchanges',
      exitExchangesWeight: 'Exit Exchanges Weight',
      exitSeedsBank: 'Exit Seeds Bank',
      percentageOfHarvestAssignedCirculating: '% Of Harvest Assigned Circulating',
      // Interface - START percentageDistributionOfNewHarvest
      gdc: 'GDC',
      bdc: 'BDC',
      organizations: 'Organizations',
      accounts: 'Accounts',
      // -END
      maxPercentageAccounts: 'Max % Accounts',
      maxPercentageOrganizations: 'Max % Organizations',
      maxPercentageBdc: 'Max % BDC',
      // Interface - Start bdcPercentagesDistribution
      regenGrantsBDC: 'Regen Grants BDC',
      regenLoans: 'Regen Loans',
      openProposal: 'Open Proposal',
      // -END
      // Interface - Start gdcPercentagesDistribution
      networkMaintenance: 'Network Maintenance',
      regenGrantsGDC: 'Regen Grants GDC',
      coreDevelopment: 'Core Development',
      interestFreeLoans: 'Interest Free Loans',
      // -END
      numPeopleAccounts: 'Number of People Accounts',
      peopleGrowth: 'People Growth',
      gdpPerPerson: 'Yearly GDP per Person',
      seedsPlantedPerUserFixed: 'Seeds Planted Per User Fixed',
      seedsPlantedPerUserVariable: 'Seeds Planted Per User Variable',
      averageSeedsBurnedPerUser: 'Average Seeds Burned Per User',
      numOrganizationAccounts: 'Number of Organization Accounts',
      organizationsGrowth: 'Organizations Growth',
      orgGrowth: 'Org Growth',
      bdcGrowth: 'BDC Growth',
      gdpPerOrganisation: 'Yearly GDP per Organization',
      numBdcs: 'Number of Bdcs',
      bdcsGrowth: 'BDCs Growth',
      // Interface Seeds Bank
      outstandingContracts: 'Outstanding Contracts',
      outstandingContractsSeeds: 'Value of Outstanding Contracts',
      closedContracts: 'Closed Contracts During Cycle',
      closedContractsSeeds: 'Value of Closed Contracts During Cycle',
      closedContractsPercentage: 'Closed Contracts Percentage',
      contracts: 'New Contracts During Cycle',
      contractsSeeds: 'Value of New Contracts During Cycle',
      contractsGrowth: 'Contracts Growth',
      seedsPerContract: 'Average Seeds per Contract',
      // Groups
      groupGDP: 'GDP',
      groupSeedsBank: 'Seeds Bank',
      groupSeedsRemove: 'Seeds Removed During Cycle',
      groupSeedsIntroduce: 'Seeds Introduced During Cycle',
      groupHarvestDistribution: 'Harvest Distribution',
      groupBDCDistribution: 'BDC Distribution',
      groupGDCDistribution: 'GDC Distribution'
    }
  },
  menu: {
    transfer: 'Transfer',
    simulation: 'Simulation'
  },
  pages: {
    index: {
      buttons: {
        createAccount: 'Create account',
        login: 'Login'
      }
    },
    general: {
      search: 'Search',
      confirmActions: 'Perform this action?',
      noAccountsFound: 'No accounts found',
      name: 'Name',
      description: 'Description'
    },
    login: {
      getApp: 'Download the app',
      title: 'Select your wallet',
      selectAccount: 'Please select an account'
    },
    harvest: {
      grownSeedsChart: {
        perThreeCycles: 'Seeds Grown 3 Cycles',
        perCycle: 'Seeds Grown Per Cycle',
        perBlock: 'Seeds Grown Per Block'
      }
    },
    saveSimulation: {
      saveSimulation: 'Save Simulation',
      mySimulations: 'My Simulations',
      allSimulations: 'All Simulations',
      loadSimulation: 'Load simulation',
      saveSimulations: 'Save Simulation',
      updateSimulations: 'Update Simulation',
      savChanges: 'Save Changes',
      simulationSaved: 'Simulation Saved',
      simulationLoaded: 'Simulation Loaded',
      searchDesc: 'Search',
      searchAccount: 'Search by Account',
      deleteSimulationMessage: 'will be deleted.',
      loadSimulationMessage: 'will be loaded.',
      cleanSimulationMessage: 'will be unloaded, unsaved changes will be lost.',
      simulationDeleted: 'Simulation deleted.',
      simulation: 'Simulation',
      cleanSimulation: 'Clean simulation loaded'
    }
  }
}
