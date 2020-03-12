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
      confirm: 'Confirm'
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
      tokenDecimals: 'The decimals must be between 2 and 9'
    },
    cycles: {
      circulatingSeeds: 'Circulating Seeds',
      volumeGrowth: 'Volume Growth',
      // changeRequiredToMeetDemand: 33339041.096,
      seedsDestroyed: 'Seeds Destroyed',
      plantedSeeds: 'Planted Seeds',
      enterExchanges: 'Enter Exchanges',
      enterExchangesWeight: 'Enter Exchanges Weight',
      enterSeedsBank: 'Enter Seeds Bank',
      // seedsRemoved3Cycles: 26681232.878,
      unplantedSeeds: 'Unplanted Seeds',
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
      numOrganizationAccounts: 'Number of Organization Accounts',
      numBdcs: 'Number of Bdcs',
      // Groups
      groupGDP: 'GDP',
      groupSeedsRemove: 'Seeds Remove',
      groupSeedsIntroduce: 'Seeds Introduce',
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
      confirmActions: 'Do you want confirm this action?'
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
    }
  }
}
