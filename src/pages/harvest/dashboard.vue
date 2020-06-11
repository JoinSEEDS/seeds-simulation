<template lang="pug">
#Container
  group-container.relative-position.q-pa-md.full-width(title="eeds" v-if="totalSimulationSteps < 1")
    .no-data-view
      card-table-totals-init.cursor-pointer(v-if="dataTableGeneral.rows" :data="dataTableGeneral.rows[0]" :selected="tableSelected === constant.SEEDS_GENERAL")
      //- .row
      //-   .col-6
      //-   .col
      //-     card-table-totals-init.cursor-pointer(v-if="dataTableGeneral.rows" :data="dataTableGeneral.rows[0]" :selected="tableSelected === constant.SEEDS_GENERAL")
      .text-no-data.text-weight-thin.text-center {{$t('common.notData')}}
      .text-no-data.text-weight-thin.text-center {{$t('common.notDataIndication')}}
  q-scroll-area.scroll-container(ref="scrollArea" v-else)
    div.q-ma-md.q-gutter-y-xl
      .row.q-col-gutter-sm.card-tables-container
        .col(@click="selectTable(constant.SEEDS_GENERAL)" )
          card-table-totals.cursor-pointer(v-if="dataTableGeneral.rows" :data="dataTableGeneral.rows[0]" :selected="tableSelected === constant.SEEDS_GENERAL")
        .col(@click="selectTable(constant.SEEDS_GROWN)")
          card-table-growth.cursor-pointer(v-if="dataTableGROWN.rows" :data="dataTableGROWN.rows[0]" :selected="tableSelected === constant.SEEDS_GROWN")
      //- .div(@click="selectTable(constant.SEEDS_GENERAL)")
      //-     q-table(
      //-     :data="dataTableGeneral.rows"
      //-     :columns="columnsTableGeneral"
      //-     row-key="name"
      //-     :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_GENERAL}"
      //-     )
      //-       template(v-slot:top)
      //-         custom-table-header(:titleTable="dataTableGeneral.tableName")
      //- .div(@click="selectTable(constant.SEEDS_GROWN)")
      //-     q-table(
      //-     :data="dataTableGROWN.rows"
      //-     :columns="columnsTableGrown"
      //-     row-key="name"
      //-     :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_GROWN}"
      //-     )
      //-       template(v-slot:top)
      //-         custom-table-header(:titleTable="dataTableGROWN.tableName")
    group-container.q-pa-md(title="eeds Distribution")
      .row.q-col-gutter-md
        .col-md-6.col-sm-12
          custom-table-header.header(:titleTable="dataTableIND.tableName" :subtitleTable="dataTableIND.totalAmount" :tableId="constant.SEEDS_IND_ACCNTS" v-bind:showAll.sync="showAllIndividualAccounts" iconSrc="peopleTableIcon")
          div.contentTable.cursor-pointer(@click="selectTable(constant.SEEDS_IND_ACCNTS)")
            q-table(
              class="my-sticky-virtscroll-table"
              :pagination.sync="pagination1"
              binary-state-sort
              virtual-scroll
              :rows-per-page-options="[0]"
              :virtual-scroll-sticky-size-start="100"
              :data="getIndividualAccounts"
              :columns="columnsTableInd"
              row-key="name"
              :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_IND_ACCNTS}"
            )
              //- template(v-slot:top)
              //-   custom-table-header(:titleTable="dataTableIND.tableName" :subtitleTable="dataTableIND.totalAmount" :tableId="constant.SEEDS_IND_ACCNTS" v-bind:showAll.sync="showAllIndividualAccounts")
        .col-md-6.col-sm-12
          custom-table-header(iconSrc="organizationTableIcon" :titleTable="dataTableORG.tableName" :subtitleTable="dataTableORG.totalAmount" :tableId="constant.SEEDS_ORG_ACCNTS" v-bind:showAll.sync="showAllOrganizationAccounts")
          div.contentTable.cursor-pointer(@click="selectTable(constant.SEEDS_ORG_ACCNTS)")
            q-table(
              class="my-sticky-virtscroll-table"
              :pagination.sync="pagination2"
              virtual-scroll
              :rows-per-page-options="[0]"
              :virtual-scroll-sticky-size-start="100"
              :data="getOrganizationAccounts"
              :columns="columnsTableOrg"
              row-key="name"
              :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_ORG_ACCNTS}"
            )
              //- template(v-slot:top)
              //-   custom-table-header(:titleTable="dataTableORG.tableName" :subtitleTable="dataTableORG.totalAmount" :tableId="constant.SEEDS_ORG_ACCNTS" v-bind:showAll.sync="showAllOrganizationAccounts")
      .row.q-col-gutter-md.q-mt-sm
        .col-md-8.col-sm-12
          custom-table-header(iconSrc="bdcTableIcon" :titleTable="dataTableBDC.tableName" :subtitleTable="dataTableBDC.totalAmount" :tableId="constant.SEEDS_BDC" v-bind:showAll.sync="showAllBDCs")
          div.contentTable.cursor-pointer(@click="selectTable(constant.SEEDS_BDC)")
            q-table(
              class="my-sticky-virtscroll-table"
              :pagination.sync="pagination3"
              virtual-scroll
              :rows-per-page-options="[0]"
              :virtual-scroll-sticky-size-start="100"
              :data="getBdcs"
              :columns="columnsTableBDC"
              row-key="name"
              :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_BDC}"
            )
              //- template(v-slot:top)
              //-   custom-table-header(:titleTable="dataTableBDC.tableName" :subtitleTable="dataTableBDC.totalAmount" :tableId="constant.SEEDS_BDC" v-bind:showAll.sync="showAllBDCs")
        .col-md-4.col-sm-12(@click="selectTable(constant.SEEDS_GDC)" v-if="dataTableGDC.rows")
            custom-table-header.headerGDC(iconSrc="gdcTableIcon" :titleTable="dataTableGDC.tableName" :subtitleTable="dataTableGDC.totalAmount")
            card-table-gdc(:data="dataTableGDC.rows[0]" :selected="tableSelected === constant.SEEDS_GDC")
            //- q-table(
            //- :data="dataTableGDC.rows"
            //- :columns="columnsTableGDC"
            //- row-key="name"
            //- :card-class="{'bg-grey-5': tableSelected == constant.SEEDS_GDC}"
            //- )
            //-   template(v-slot:top)
            //-       custom-table-header(iconSrc="gdcTableIcon" :titleTable="dataTableGDC.tableName" :subtitleTable="dataTableGDC.totalAmount")
    div.row.justify-start.q-pl-md(
      :class="{ 'hidden': !showOptions }"
    )
      q-select.col-3(
        v-model='valueSelected'
        :options='options'
        :label="$t('forms.cycles.chartOptions')"
      )
    custom-chart.q-mb-xl(
      v-show="tableSelected"
      :dataChart="dataChart",
      :chartName="dataChart.chartName",
      xAxisTitle="Cycles",
      yAxisTitle="Seeds"
    )
</template>

<script>
import CustomChart from '~/pages/harvest/chart'
import CustomTableHeader from '~/pages/harvest/components/customTableHeader'
import CardTableTotalsInit from '~/pages/harvest/components/card-table-totals-init'
import CardTableTotals from '~/pages/harvest/components/card-table-totals'
import CardTableGrowth from '~/pages/harvest/components/card-table-growth'
import CardTableGdc from '~/pages/harvest/components/card-table-gdc'
import harvestConstant from '~/const/harvestConstants'
import GroupContainer from '~/components/group-container'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'harvest-dashboard',
  components: { CustomChart, CustomTableHeader, CardTableTotals, CardTableGrowth, CardTableGdc, GroupContainer, CardTableTotalsInit },
  beforeMount () {
    this.constant = harvestConstant
  },
  mounted () {
    this.getInitSimulationStep()
    this.tableSelected = 0
    this.$store.$EventBus.$on('simulation-applied', () => {
      this.tableSelected = 6
      // this.$nextTick()
      this.getDataChart({ tableId: this.tableSelected, compare: this.valueOption })
      this.$nextTick()
      this.showOptions = false
      console.log('Event bus listened on Dashboard, Chart and tables updated')
    })
    this.$store.$EventBus.$on('simulation-cleaned', () => {
      this.tableSelected = undefined
      // this.$nextTick()
      // this.getDataChart({ tableId: this.tableSelected, compare: this.valueOption })
      this.$nextTick()
      this.showOptions = false
      console.log('Event bus listened on Dashboard, simulation updated')
    })
  },
  beforeDestroy () {
    this.$store.$EventBus.$off('simulation-applied')
    this.$store.$EventBus.$off('simulation-cleaned')
  },
  watch: {
    simulationStep (currentStep, prevStep) {
      if (currentStep <= 1) return
      console.log('The simulation step was changed', currentStep, prevStep)
      console.log('Before Cycle Tables', this.getSimulationState)
      this.setCycleTables({ step: this.simulationStep })
      console.log('After Cycle Tables', this.getSimulationState)
      if (this.simulationStep > prevStep) this.getDataChart({ tableId: this.tableSelected, compare: this.valueOption })
      console.log('Tables updated')
      console.log('After Tables updated', this.getSimulationState)
    },
    totalSimulationSteps (newV, oldV) {
      if (this.totalSimulationSteps > 0 && oldV === 0) {
        this.getDataChart({ tableId: this.tableSelected, compare: this.valueOption })
        console.log('After Updated simulation steps', this.getSimulationState)
        this.tableSelected = 1
      }
    },
    tableSelected () {
      this.getDataChart({ tableId: this.tableSelected, compare: this.valueOption })
      if (this.tableSelected === this.constant.SEEDS_IND_ACCNTS ||
          this.tableSelected === this.constant.SEEDS_ORG_ACCNTS ||
          this.tableSelected === this.constant.SEEDS_BDC) {
        this.showOptions = true
      } else {
        this.showOptions = false
      }
    },
    valueSelected () {
      if (this.valueSelected === this.options[1]) {
        this.valueOption = 1
      } else if (this.valueSelected === this.options[2]) {
        this.valueOption = 2
      } else {
        this.valueOption = 0
      }

      this.getDataChart({ tableId: this.tableSelected, compare: this.valueOption })
    }
  },
  computed: {
    ...mapGetters('harvest', ['dataTableGeneral', 'dataTableGROWN', 'dataTableIND', 'dataTableORG', 'dataTableBDC', 'dataTableGDC', 'simulationStep', 'totalSimulationSteps', 'dataChart', 'getSimulationState']),
    getIndividualAccounts () {
      switch (this.showAllIndividualAccounts) {
        case 1:
          return this.dataTableIND.sample3
        case 2:
          return this.dataTableIND.sample10
        case 3:
          return this.dataTableIND.all
        default:
          return []
      }
    },
    getOrganizationAccounts () {
      switch (this.showAllOrganizationAccounts) {
        case 1:
          return this.dataTableORG.sample3
        case 2:
          return this.dataTableORG.sample10
        case 3:
          return this.dataTableORG.all
        default:
          return []
      }
    },
    getBdcs () {
      switch (this.showAllBDCs) {
        case 1:
          return this.dataTableBDC.sample3
        case 2:
          return this.dataTableBDC.sample10
        case 3:
          return this.dataTableBDC.all
        default:
          return []
      }
    }
  },
  methods: {
    ...mapActions('harvest', ['getDataTable', 'getDataChart', 'doCycle', 'setCycleTables', 'getInitSimulationStep']),
    /**
     * This method toggle select between the tables
     */
    selectTable (table) {
      if (this.getSimulationState.length <= 0) {
        this.showErrorMsg('You must add a cycle to select a table')
        return
      }
      if (this.tableSelected !== table) {
        this.tableSelected = table
        // window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
        this.$refs.scrollArea.setScrollPosition(10000, 500)
      }
    }
  },
  data () {
    return {
      pagination1: {
        rowsPerPage: 0,
        // ascending: true,
        sortBy: 'asc'
      },
      pagination2: {
        rowsPerPage: 0,
        descendig: true
      },
      pagination3: {
        rowsPerPage: 0,
        ascending: true
      },
      valueSelected: null,
      valueOption: 0,
      options: [
        'first - middle - last', 'every 10 (11 samples)', 'every 20 (6 samples)'
      ],
      showOptions: false,
      showAllIndividualAccounts: 1,
      showAllOrganizationAccounts: 1,
      showAllBDCs: 1,
      tableGrownExpanded: false,
      tableSelected: undefined,
      constant: undefined,
      columnsTableGeneral: [
        { name: 'totalSeeds', align: 'left', label: 'Total Seeds', field: 'totalSeeds', sortable: true, headerClasses: 'bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'totalCirculatingSeeds', align: 'center', label: 'Total Circulating Seeds', field: 'totalCirculatingSeeds', sortable: true, headerClasses: 'bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'totalSeedsPlanted', align: 'center', label: 'Total Seeds Planted', field: 'totalSeedsPlanted', sortable: true, headerClasses: 'bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'totalSeedsBurned', align: 'right', label: 'Total Seeds Burned', field: 'totalSeedsBurned', sortable: true, headerClasses: 'bg-primary text-white', format: val => this.formatToMoney(val) }
      ],
      columnsTableGrown: [
        {
          name: 'seeds3cycles',
          required: true,
          label: 'Seeds Grown 3 Cycles',
          align: 'left',
          field: 'seeds3cycles',
          format: val => this.formatToMoney(val),
          sortable: true,
          headerClasses: 'bg-primary text-white',
          style: 'max-width: 100px'
        },
        { name: 'seedsPerCycle', align: 'center', label: 'Seeds Grown Per Cycle', field: 'seedsPerCycle', sortable: true, headerClasses: 'bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'seedsPerBlock', align: 'right', label: 'Seeds Grown Per Block', field: 'seedsPerBlock', sortable: true, headerClasses: 'bg-primary text-white', format: val => this.formatToMoney(val) }
      ],
      columnsTableInd: [
        {
          name: 'position',
          required: true,
          label: 'Percentile',
          align: 'left',
          field: 'position',
          sortable: true,
          headerClasses: 'bg-primary text-white text-weight-bold sticky',
          style: 'max-width: 100px'
        },
        { name: 'numberUsers', align: 'center', label: '# People Accounts', field: 'numberUsers', sortable: true, headerClasses: 'bg-primary text-white sticky', format: val => this.formatToMoney(val) },
        {
          name: 'totalAmount',
          label: 'Total Amount',
          field: 'totalAmount',
          sortable: true,
          headerClasses: 'bg-primary text-white text-weight-bold sticky',
          format: val => this.formatToMoney(val)
        },
        { name: 'totalAmountPerUser', label: 'Total Amount per Account', field: 'totalAmountPerUser', sortable: true, headerClasses: 'bg-primary text-white sticky', format: val => this.formatToMoney(val) }
      ],
      columnsTableOrg: [
        {
          name: 'position',
          required: true,
          label: 'Percentile',
          align: 'left',
          field: 'position',
          sortable: true,
          // format: val => `${val}`,
          headerClasses: 'sticky bg-primary text-white',
          style: 'max-width: 100px'
        },
        { name: 'numberUsers', align: 'center', label: '# Org. Accounts', field: 'numberUsers', sortable: true, headerClasses: 'sticky bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'totalAmount', label: 'Total Amount', field: 'totalAmount', sortable: true, headerClasses: 'sticky bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'totalAmountPerOrganization', label: 'Total Amount per Org.', field: 'totalAmountPerUser', sortable: true, headerClasses: 'sticky bg-primary text-white', format: val => this.formatToMoney(val) }
      ],
      columnsTableBDC: [
        {
          name: 'position',
          required: true,
          label: 'Percentile',
          align: 'left',
          field: 'position',
          sortable: true,
          // format: val => `${val}`,
          headerClasses: 'sticky bg-primary text-white',
          style: 'max-width: 100px'
        },
        { name: 'numBdc', align: 'left', label: '# of BDC\'s', field: 'numBdcs', sortable: true, headerClasses: 'sticky bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'openProposal', label: 'Open Proposal', field: 'openProposal', sortable: true, headerClasses: 'sticky bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'regenGrants', label: 'Regen Grants', field: 'regenGrants', sortable: true, headerClasses: 'sticky bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'regenLoans', label: 'Regen Loans', field: 'regenLoans', sortable: true, headerClasses: 'sticky bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'totalAmount', label: 'Total Amount', field: 'budget', sortable: true, headerClasses: 'sticky bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'totalAmountPerBdc', label: 'Total Amount per BDC', field: 'budgetPerBdc', sortable: true, headerClasses: 'sticky bg-primary text-white', format: val => this.formatToMoney(val) }
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
          style: 'max-width: 100px',
          format: val => this.formatToMoney(val)
        },
        { name: 'networkMaintenance', align: 'center', label: 'Network Mnt.', field: 'networkMaintenance', sortable: true, headerClasses: 'bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'regenGrants', label: 'Regen Grants', field: 'regenGrants', sortable: true, headerClasses: 'bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'coreDevelopment', label: 'Core Development', field: 'coreDevelopment', sortable: true, headerClasses: 'bg-primary text-white', format: val => this.formatToMoney(val) },
        { name: 'interestFreeLoans', label: 'Interest Free Loans', field: 'interestFreeLoans', sortable: true, headerClasses: 'bg-primary text-white', format: val => this.formatToMoney(val) }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
  .text-no-data
    font-size: 20px
  .no-data-view
    height: 78vh
  .card-tables-container
    // max-height: 300px
  .contentTable
    margin-top: -2px
  .scroll-container
    height: calc(100vh - 50px)
    max-width: 100%
  .height-table
    height: 350px
  // @media (min-width: 768px)
  //   .height-table
  //     height: 400px
  .my-sticky-virtscroll-table
    height: 350px

    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th
      background-color: #fff

    thead tr th
      position: sticky
      z-index: 1
    thead tr:last-child th
      top: 48px
    thead tr:first-child th
      top: 0
</style>
