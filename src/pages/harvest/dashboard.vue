<template lang="pug">
    div.q-ma-xl.q-gutter-xl

        #customTable(@click="selectTable(constant.SEEDS_GROWN)")
            q-table(
            :data="dataTableGROWN"
            :columns="columnsTableGrown"
            row-key="name"
            :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_GROWN}"
            )

        .div(@click="selectTable(constant.SEEDS_IND_ACCNTS)")
            q-table(
            :data="dataTableIND"
            :columns="columnsTableInd"
            row-key="name"
            :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_IND_ACCNTS}"
            )

        .div(@click="selectTable(constant.SEEDS_ORG_ACCNTS)")
            q-table(
            :data="dataTableORG"
            :columns="columnsTableOrg"
            row-key="name"
            :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_ORG_ACCNTS}"
            )

        .div(@click="selectTable(constant.SEEDS_BDC)")
            q-table(
            :data="dataTableBDC"
            :columns="columnsTableBDC"
            row-key="name"
            :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_BDC}"
            )

        .div(@click="selectTable(constant.SEEDS_GDC)")
            q-table(
            :data="dataTableGDC"
            :columns="columnsTableGDC"
            row-key="name"
            :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_GDC}"
            )

        custom-chart(
          :dataChart="myDataChart",
          :chartName="myDataChart.chartName",
          xAxisTitle="Cycles",
          yAxisTitle="Seeds"
          )
</template>

<script>
import CustomChart from '~/pages/harvest/chart'
import harvestConstant from '~/const/harvestConstants'
import { mapActions, mapGetters } from 'vuex'
// import { EventBus } from '~/mixins/utils'
export default {
  name: 'harvest-dashboard',
  components: { CustomChart },
  beforeMount () {
    this.constant = harvestConstant
  },
  mounted () {
    this.getDataTable('None')
    this.fillToTest()
    this.fillToTest()
  },
  watch: {
    tableSelected () {
      // this.doCycle(
      //   {
      //     simulationState: {
      //       circulatingSeeds: 1333561643.84,
      //       volumeGrowth: 0.025,
      //       changeRequiredToMeetDemand: 33339041.096,
      //       seedsDestroyed: 10000,
      //       plantedSeeds: 13335616.44,
      //       enterExchanges: 133356164.38,
      //       enterExchangesWeight: 0.1,
      //       enterSeedsBank: 0,
      //       seedsRemoved3Cycles: 26681232.878,
      //       unplantedSeeds: 1333561.64,
      //       exitExchanges: 66678082.19,
      //       exitExchangesWeight: 0.1,
      //       exitSeedsBank: 6667808.22,
      //       seedsIntroducedPrevious3Cycles: 14669178.079,
      //       seedsGrownPerCycle: 15117031.964999998,
      //       percentageOfHarvestAssignedCirculating: 0.5,
      //       percentageDistributionOfNewHarvest: { gdc: 0.3, bdc: 0.2, organizations: 0.2, accounts: 0.3 },
      //       maxPercentageAccounts: 0.012,
      //       maxPercentageOrganizations: 0.011,
      //       maxPercentageBdc: 0.013,
      //       bdcPercentagesDistribution: { regenGrants: 0.25, regenLoans: 0.25, openProposal: 0.5 },
      //       gdcPercentagesDistribution: {
      //         networkMaintenance: 0.15,
      //         regenGrants: 0.2,
      //         coreDevelopment: 0.45,
      //         interestFreeLoans: 0.2
      //       },
      //       numPeopleAccounts: 10000000,
      //       numOrganizationAccounts: 100000,
      //       numBdcs: 100,
      //       harvestDistribution: {}
      //     }
      //   }
      // )
      // this.editSimulationState(
      //   {
      //     stateEdited: {
      //       circulatingSeeds: 23.84,
      //       volumeGrowth: 0.025,
      //       changeRequiredToMeetDemand: 33339041.096,
      //       seedsDestroyed: 10000,
      //       plantedSeeds: 13335616.44,
      //       enterExchanges: 133356164.38,
      //       enterExchangesWeight: 0.1,
      //       enterSeedsBank: 0,
      //       seedsRemoved3Cycles: 26681232.878,
      //       unplantedSeeds: 1333561.64,
      //       exitExchanges: 66678082.19,
      //       exitExchangesWeight: 0.1,
      //       exitSeedsBank: 6667808.22,
      //       seedsIntroducedPrevious3Cycles: 14669178.079,
      //       seedsGrownPerCycle: 15117031.964999998,
      //       percentageOfHarvestAssignedCirculating: 0.5,
      //       percentageDistributionOfNewHarvest: { gdc: 0.3, bdc: 0.2, organizations: 0.2, accounts: 0.3 },
      //       maxPercentageAccounts: 0.012,
      //       maxPercentageOrganizations: 0.011,
      //       maxPercentageBdc: 0.013,
      //       bdcPercentagesDistribution: { regenGrants: 0.25, regenLoans: 0.25, openProposal: 0.5 },
      //       gdcPercentagesDistribution: {
      //         networkMaintenance: 0.15,
      //         regenGrants: 0.2,
      //         coreDevelopment: 0.45,
      //         interestFreeLoans: 0.2
      //       },
      //       numPeopleAccounts: 10000000,
      //       numOrganizationAccounts: 100000,
      //       numBdcs: 100,
      //       harvestDistribution: {}
      //     },
      //     step: 0
      //   }
      // )
      // this.getDataTable(this.tableSelected)
      this.getDataChart({ tableId: this.tableSelected })
    }
  },
  computed: {
    ...mapGetters('harvest', ['dataTableGROWN', 'dataTableIND', 'dataTableORG', 'dataTableBDC', 'dataTableGDC']),
    myDataTable1 () {
      return this.$store.state.harvest.dataTable1
    },
    myDataChart () {
      return this.$store.state.harvest.dataChart
    }
  },
  methods: {
    ...mapActions('harvest', ['getDataTable', 'getDataChart', 'doCycle', 'editSimulationState', 'setCycleTables']),
    /**
     * This method toggle select between the tables
     */
    selectTable (table) {
      if (this.tableSelected !== table) {
        this.tableSelected = table
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
      }
    },
    fillToTest () {
      this.doCycle(
        {
          simulationState: {
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
            // seedsIntroducedPrevious3Cycles: 14669178.079,
            // seedsGrownPerCycle: 15117031.964999998,
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
            numBdcs: 100
            // harvestDistribution: {}
          }
        })
    }
  },
  data () {
    return {
      tableSelected: 0,
      constant: undefined,
      columnsTableGrown: [
        {
          name: 'seeds3cycles',
          required: true,
          label: 'Seeds Grown 3 Cycles',
          align: 'left',
          field: 'seeds3cycles',
          format: val => `${val.toFixed(2)}`,
          sortable: true,
          headerClasses: 'bg-primary text-white',
          style: 'max-width: 100px'
        },
        { name: 'seedsPerCycle', align: 'center', label: 'Seeds Grown Per Cycle', field: 'seedsPerCycle', sortable: true, headerClasses: 'bg-primary text-white', format: val => `${val.toFixed(2)}` },
        { name: 'seedsPerBlock', align: 'right', label: 'Seeds Grown Per Block', field: 'seedsPerBlock', sortable: true, headerClasses: 'bg-primary text-white', format: val => `${val.toFixed(2)}` }
      ],
      columnsTableInd: [
        {
          name: 'position',
          required: true,
          label: 'Rank',
          align: 'left',
          field: 'position',
          sortable: true,
          headerClasses: 'bg-primary text-white',
          style: 'max-width: 100px'
        },
        { name: 'numberUsers', align: 'center', label: 'Number People Accounts', field: 'numberUsers', sortable: true, headerClasses: 'bg-primary text-white' },
        {
          name: 'totalAmount',
          label: 'Total Amount',
          field: 'totalAmount',
          sortable: true,
          headerClasses: 'bg-primary text-white',
          format: val => `Hola ${val}`
        },
        { name: 'totalAmountPerUser', label: 'Total Amount per Account', field: 'totalAmountPerUser', sortable: true, headerClasses: 'bg-primary text-white' }
      ],
      columnsTableOrg: [
        {
          name: 'position',
          required: true,
          label: 'Rank',
          align: 'left',
          field: 'position',
          // format: val => `${val}`,
          sortable: true,
          headerClasses: 'bg-primary text-white',
          style: 'max-width: 100px'
        },
        { name: 'numberUsers', align: 'center', label: 'Number Organization Accounts', field: 'numberUsers', sortable: true, headerClasses: 'bg-primary text-white' },
        { name: 'totalAmount', label: 'Total Amount', field: 'totalAmount', sortable: true, headerClasses: 'bg-primary text-white' },
        { name: 'totalAmountPerOrganization', label: 'Total Amount per Organization', field: 'totalAmountPerOrganization', sortable: true, headerClasses: 'bg-primary text-white' }
      ],
      columnsTableBDC: [
        {
          name: 'position',
          required: true,
          label: 'Rank',
          align: 'left',
          field: 'position',
          // format: val => `${val}`,
          sortable: true,
          headerClasses: 'bg-primary text-white',
          style: 'max-width: 100px'
        },
        { name: 'numBdc', align: 'center', label: 'Number BDC', field: 'numBdc', sortable: true, headerClasses: 'bg-primary text-white' },
        { name: 'budget', label: 'Total Amount', field: 'budget', sortable: true, headerClasses: 'bg-primary text-white' },
        { name: 'budgetPerBdc', label: 'Something strange', field: 'budgetPerBdc', sortable: true, headerClasses: 'bg-primary text-white' }
      ],
      columnsTableGDC: [
        {
          name: 'totalAmountForGdc',
          required: true,
          label: 'Total Amount',
          align: 'left',
          field: 'totalAmountForGdc',
          // format: val => `${val}`,
          sortable: true,
          headerClasses: 'bg-primary text-white',
          style: 'max-width: 100px'
        },
        { name: 'networkMaintenance', align: 'center', label: 'Network Maintenance', field: 'networkMaintenance', sortable: true, headerClasses: 'bg-primary text-white' },
        { name: 'regenGrants', label: 'Regen Grants', field: 'regenGrants', sortable: true, headerClasses: 'bg-primary text-white' },
        { name: 'coreDevelopment', label: 'Core Development', field: 'coreDevelopment', sortable: true, headerClasses: 'bg-primary text-white' },
        { name: 'interestFreeLoans', label: 'Interest Free Loans', field: 'interestFreeLoans', sortable: true, headerClasses: 'bg-primary text-white' }
      ]
    }
  }
}
</script>
