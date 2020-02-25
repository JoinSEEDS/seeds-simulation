<template lang="pug">
    div.q-ma-xl.q-gutter-xl

        #customTable(@click="selectTable(constant.SEEDS_GROWN)")
            q-table(
            :data="dataTable1"
            :columns="columnsTable1"
            row-key="name"
            :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_GROWN}"
            )

        .div(@click="selectTable(constant.SEEDS_IND_ACCNTS)")
            q-table(
            :data="data"
            :columns="columnsTable2"
            row-key="name"
            :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_IND_ACCNTS}"
            )

        .div(@click="selectTable(constant.SEEDS_ORG_ACCNTS)")
            q-table(
            :data="data"
            :columns="columnsTable3"
            row-key="name"
            :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_ORG_ACCNTS}"
            )

        .div(@click="selectTable(constant.SEEDS_BDC)")
            q-table(
            :data="data"
            :columns="columnsTable4"
            row-key="name"
            :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_BDC}"
            )

        .div(@click="selectTable(constant.SEEDS_GDC)")
            q-table(
            :data="data"
            :columns="columnsTable5"
            row-key="name"
            :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_GDC}"
            )

        custom-chart(:dataChart="myDataChart")
          //- template(v-slot:container)
          //-   h2 test
          //-   #chart-area1
        custom-chart(:dataChart="[]")
          //- template(v-slot:container)
          //-   h2 test 2
          //-   #chart-area2
</template>

<script>
import CustomChart from '~/pages/harvest/chart'
import { seeds } from '~/mixins/seeds'
import harvestConstant from '~/const/harvestConstants'
// import { EventBus } from '~/mixins/utils'
export default {
  name: 'harvest-dashboard',
  components: { CustomChart },
  mixins: [ seeds ],
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
  methods: {
    /**
     * This method toggle select between the tables
     */
    selectTable (table) {
      this.tableSelected = table
      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
    },
    fillToTest () {
      this.doCycle(
        {
          simulationState: {
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
            harvestDistribution: {}
          }
        })
    }
  },
  data () {
    return {
      tableSelected: 0,
      constant: undefined,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          // classes: 'bg-grey-2 ellipsis',
          headerClasses: 'bg-primary text-white',
          style: 'max-width: 100px'
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true, headerClasses: 'bg-primary text-white' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium', headerClasses: 'bg-primary text-white' },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, headerClasses: 'bg-primary text-white', sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      columnsTable1: [
        {
          name: 'seeds3cycles',
          required: true,
          label: 'Seeds Grown 3 Cycles',
          align: 'left',
          field: 'seeds3cycles',
          // format: val => `${val}`,
          sortable: true,
          headerClasses: 'bg-primary text-white',
          style: 'max-width: 100px'
        },
        { name: 'seedsPerCycle', align: 'center', label: 'Seeds Grown Per Cycle', field: 'seedsPerCycle', sortable: true, headerClasses: 'bg-primary text-white' },
        { name: 'seedsPerBlock', align: 'right', label: 'Seeds Grown Per Block', field: 'seedsPerBlock', sortable: true, headerClasses: 'bg-primary text-white' }
      ],
      columnsTable2: [
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
        { name: 'numberUsers', align: 'center', label: 'Number People Accounts', field: 'numberUsers', sortable: true, headerClasses: 'bg-primary text-white' },
        { name: 'totalAmount', label: 'Total Amount', field: 'totalAmount', sortable: true, headerClasses: 'bg-primary text-white' },
        { name: 'totalAmountPerUser', label: 'Total Amount per Account', field: 'totalAmountPerUser', sortable: true, headerClasses: 'bg-primary text-white' }
      ],
      columnsTable3: [
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
      columnsTable4: [
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
      columnsTable5: [
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
      ],
      dataTable1: [{
        name: 'Seeds Created',
        seeds3cycles: 0,
        seedsPerCycle: 0,
        seedsPerBlock: 0
      }],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          sodium: 87,
          calcium: '14%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ]
    }
  }
}
</script>
