<template lang="pug">
    #container.q-ma-md.q-gutter-y-sm
        q-scroll-area.scroll-container
            .template-form
                q-form.q-gutter-y-sm
                    q-field(filled v-model='circulatingSeeds' :label="$t('forms.cycles.circulatingSeeds')")
                        template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                            input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                    //- q-input(filled
                    //-     v-model="circulatingSeeds"
                    //-     :label="$t('forms.cycles.circulatingSeeds')"
                    //-     type="text")
                    q-input(filled
                        v-model="volumeGrowth"
                        :label="$t('forms.cycles.volumeGrowth')"
                        type="number"
                        )
                    q-input(filled
                        v-model="seedsDestroyed"
                        :label="$t('forms.cycles.seedsDestroyed')"
                        type="number")
                    q-input(filled
                        v-model="plantedSeeds"
                        :label="$t('forms.cycles.plantedSeeds')"
                        type="number"
                        )
                    q-input(filled
                        v-model="enterExchanges"
                        :label="$t('forms.cycles.enterExchanges')"
                        type="number"
                        )
                    q-input(filled
                        v-model="enterExchangesWeight"
                        :label="$t('forms.cycles.enterExchangesWeight')"
                        type="number"
                        )
                    q-input(filled
                        v-model="enterSeedsBank"
                        :label="$t('forms.cycles.enterSeedsBank')"
                        type="number"
                        )
                    q-input(filled
                        v-model="unplantedSeeds"
                        :label="$t('forms.cycles.unplantedSeeds')"
                        type="number"
                        )
                    q-input(filled
                        v-model="exitExchanges"
                        :label="$t('forms.cycles.exitExchanges')"
                        type="number"
                        )
                    q-input(filled
                        v-model="exitExchangesWeight"
                        :label="$t('forms.cycles.exitExchangesWeight')"
                        type="number"
                        )
                    q-input(filled
                        v-model="exitSeedsBank"
                        :label="$t('forms.cycles.exitSeedsBank')"
                        type="number"
                        )
                    q-input(filled
                        v-model="percentageOfHarvestAssignedCirculating"
                        :label="$t('forms.cycles.percentageOfHarvestAssignedCirculating')"
                        type="number"
                        )
                    div.form-group
                        q-input(filled
                            v-model="gdc"
                            :label="$t('forms.cycles.gdc')"
                            type="number"
                            )
                        q-input(filled
                            v-model="bdc"
                            :label="$t('forms.cycles.bdc')"
                            type="number"
                            )
                        q-input(filled
                            v-model="organizations"
                            :label="$t('forms.cycles.organizations')"
                            type="number"
                            )
                        q-input(filled
                            v-model="accounts"
                            :label="$t('forms.cycles.accounts')"
                            type="number"
                            )
                    q-input(filled
                        v-model="maxPercentageAccounts"
                        :label="$t('forms.cycles.maxPercentageAccounts')"
                        type="number"
                        )
                    q-input(filled
                        v-model="maxPercentageOrganizations"
                        :label="$t('forms.cycles.maxPercentageOrganizations')"
                        type="number"
                        )
                    q-input(filled
                        v-model="maxPercentageBdc"
                        :label="$t('forms.cycles.maxPercentageBdc')"
                        type="number"
                        )
                    div.form-group
                        q-input(filled
                            v-model="regenGrantsBDC"
                            :label="$t('forms.cycles.regenGrantsBDC')"
                            type="number"
                            )
                        q-input(filled
                            v-model="regenLoans"
                            :label="$t('forms.cycles.regenLoans')"
                            type="number"
                            )
                        q-input(filled
                            v-model="openProposal"
                            :label="$t('forms.cycles.openProposal')"
                            type="number"
                            )
                    div.form-group
                        q-input(filled
                            v-model="networkMaintenance"
                            :label="$t('forms.cycles.networkMaintenance')"
                            type="number"
                            )
                        q-input(filled
                            v-model="regenGrantsGDC"
                            :label="$t('forms.cycles.regenGrantsGDC')"
                            type="number"
                            )
                        q-input(filled
                            v-model="coreDevelopment"
                            :label="$t('forms.cycles.coreDevelopment')"
                            type="number"
                            )
                        q-input(filled
                            v-model="interestFreeLoans"
                            :label="$t('forms.cycles.interestFreeLoans')"
                            type="number"
                            )
                    q-input(filled
                        v-model="numPeopleAccounts"
                        :label="$t('forms.cycles.numPeopleAccounts')"
                        type="number"
                        )
                    q-input(filled
                        v-model="numOrganizationAccounts"
                        :label="$t('forms.cycles.numOrganizationAccounts')"
                        type="number"
                        )
                    q-input(filled
                        v-model="numBdcs"
                        :label="$t('forms.cycles.numBdcs')"
                        type="number"
                        )
        .row.justify-around.items-center
            .column.justify-center
                .col-4
                    q-btn(round :disabled="simulationStep == 0" color="secondary" icon="skip_previous" @click="() => backCycle()")
            .column.justify-center
                .col-6
                 p {{simulationStep}} / {{totalSimulationSteps}}
            .column.justify-center
                .col-3
                 q-btn(round color="secondary" icon="skip_next" @click="() => nextCycle()")
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
// import Vue from 'vue'
import { VMoney } from 'v-money'

export default {
  name: 'add-cycle-form',
  directives: { money: VMoney },
  data () {
    return {
      price: 0,
      moneyFormat: {
        decimal: '.',
        thousands: ',',
        precision: 2
      },
      circulatingSeeds: 0,
      volumeGrowth: 0,
      // changeRequiredToMeetDemand: 33339041.096,
      seedsDestroyed: 0,
      plantedSeeds: 0,
      enterExchanges: 0,
      enterExchangesWeight: 0,
      enterSeedsBank: 0,
      // seedsRemoved3Cycles: 26681232.878,
      unplantedSeeds: 0,
      exitExchanges: 0,
      exitExchangesWeight: 0,
      exitSeedsBank: 0,
      percentageOfHarvestAssignedCirculating: 0,
      // Interface - START percentageDistributionOfNewHarvest
      gdc: 0,
      bdc: 0,
      organizations: 0,
      accounts: 0,
      // -END
      maxPercentageAccounts: 0,
      maxPercentageOrganizations: 0,
      maxPercentageBdc: 0,
      // Interface - Start bdcPercentagesDistribution
      regenGrantsBDC: 0,
      regenLoans: 0,
      openProposal: 0,
      // -END
      // Interface - Start gdcPercentagesDistribution
      networkMaintenance: 0,
      regenGrantsGDC: 0,
      coreDevelopment: 0,
      interestFreeLoans: 0,
      // -END
      numPeopleAccounts: 0,
      numOrganizationAccounts: 0,
      numBdcs: 0
    }
  },
  computed: {
    ...mapGetters('harvest', ['simulationStep', 'totalSimulationSteps', 'cycleDataForm', 'getSimulationState'])
  },
  mounted () {
    this.syncFormData()
  },
  watch: {
    simulationStep (currentStep, prevStep) {
      console.log('Form data syncronized', prevStep)
      this.syncFormData()
    }
  },
  methods: {
    ...mapActions('harvest', ['getInitSimulationStep', 'doCycle']),
    ...mapMutations('harvest', ['setSimulationStep']),
    backCycle () {
      console.log('Before back:', this.getSimulationState)
      this.setSimulationStep((this.simulationStep - 1))
      console.log('After back:', this.getSimulationState)
    },
    nextCycle () {
      console.log('Before next:', JSON.stringify(this.getSimulationState, null, 4))
      this.doCycle(
        {
          simulationState: {
            circulatingSeeds: parseFloat(this.circulatingSeeds),
            volumeGrowth: parseFloat(this.volumeGrowth),
            // changeRequiredToMeetDemand: 33339041.096,
            seedsDestroyed: parseFloat(this.seedsDestroyed),
            plantedSeeds: parseFloat(this.plantedSeeds),
            enterExchanges: parseFloat(this.enterExchanges),
            enterExchangesWeight: parseFloat(this.enterExchangesWeight),
            enterSeedsBank: parseFloat(this.enterSeedsBank),
            // seedsRemoved3Cycles: 26681232.878,
            unplantedSeeds: parseFloat(this.unplantedSeeds),
            exitExchanges: parseFloat(this.exitExchanges),
            exitExchangesWeight: parseFloat(this.exitExchangesWeight),
            exitSeedsBank: parseFloat(this.exitSeedsBank),
            // seedsIntroducedPrevious3Cycles: 14669178.079,
            // seedsGrownPerCycle: 15117031.964999998,
            percentageOfHarvestAssignedCirculating: parseFloat(this.percentageOfHarvestAssignedCirculating),
            percentageDistributionOfNewHarvest: { gdc: parseFloat(this.gdc), bdc: parseFloat(this.bdc), organizations: parseFloat(this.organizations), accounts: parseFloat(this.accounts) },
            maxPercentageAccounts: parseFloat(this.maxPercentageAccounts),
            maxPercentageOrganizations: parseFloat(this.maxPercentageOrganizations),
            maxPercentageBdc: parseFloat(this.maxPercentageBdc),
            bdcPercentagesDistribution: { regenGrants: parseFloat(this.regenGrantsBDC), regenLoans: parseFloat(this.regenLoans), openProposal: parseFloat(this.openProposal) },
            gdcPercentagesDistribution: {
              networkMaintenance: parseFloat(this.networkMaintenance),
              regenGrants: parseFloat(this.regenGrantsGDC),
              coreDevelopment: parseFloat(this.coreDevelopment),
              interestFreeLoans: parseFloat(this.interestFreeLoans)
            },
            numPeopleAccounts: parseFloat(this.numPeopleAccounts),
            numOrganizationAccounts: parseFloat(this.numOrganizationAccounts),
            numBdcs: parseFloat(this.numBdcs)
            // harvestDistribution: {}
          },
          step: (this.simulationStep - 1)
        })
      console.log('After next:', this.getSimulationState)
    },
    syncFormData () {
      console.log('Before Sync Form:', this.getSimulationState)
      this.circulatingSeeds = this.cycleDataForm.circulatingSeeds.toFixed(2)
      this.volumeGrowth = this.cycleDataForm.volumeGrowth.toFixed(2)
      this.seedsDestroyed = this.cycleDataForm.seedsDestroyed.toFixed(2)
      this.plantedSeeds = this.cycleDataForm.plantedSeeds.toFixed(2)
      this.enterExchanges = this.cycleDataForm.enterExchanges.toFixed(2)
      this.enterExchangesWeight = this.cycleDataForm.enterExchangesWeight.toFixed(2)
      this.enterSeedsBank = this.cycleDataForm.enterSeedsBank.toFixed(2)
      this.unplantedSeeds = this.cycleDataForm.unplantedSeeds.toFixed(2)
      this.exitExchanges = this.cycleDataForm.exitExchanges.toFixed(2)
      this.exitExchangesWeight = this.cycleDataForm.exitExchangesWeight.toFixed(2)
      this.exitSeedsBank = this.cycleDataForm.exitSeedsBank.toFixed(2)
      this.percentageOfHarvestAssignedCirculating = this.cycleDataForm.percentageOfHarvestAssignedCirculating.toFixed(2)
      this.gdc = this.cycleDataForm.percentageDistributionOfNewHarvest.gdc.toFixed(2)
      this.bdc = this.cycleDataForm.percentageDistributionOfNewHarvest.bdc.toFixed(2)
      this.organizations = this.cycleDataForm.percentageDistributionOfNewHarvest.organizations.toFixed(2)
      this.accounts = this.cycleDataForm.percentageDistributionOfNewHarvest.accounts.toFixed(2)
      this.maxPercentageAccounts = this.cycleDataForm.maxPercentageAccounts.toFixed(2)
      this.maxPercentageOrganizations = this.cycleDataForm.maxPercentageOrganizations.toFixed(2)
      this.maxPercentageBdc = this.cycleDataForm.maxPercentageBdc.toFixed(2)
      this.regenGrantsBDC = this.cycleDataForm.bdcPercentagesDistribution.regenGrants.toFixed(2)
      this.regenLoans = this.cycleDataForm.bdcPercentagesDistribution.regenLoans.toFixed(2)
      this.openProposal = this.cycleDataForm.bdcPercentagesDistribution.openProposal.toFixed(2)
      this.networkMaintenance = this.cycleDataForm.gdcPercentagesDistribution.networkMaintenance.toFixed(2)
      this.regenGrantsGDC = this.cycleDataForm.gdcPercentagesDistribution.regenGrants.toFixed(2)
      this.coreDevelopment = this.cycleDataForm.gdcPercentagesDistribution.coreDevelopment.toFixed(2)
      this.interestFreeLoans = this.cycleDataForm.gdcPercentagesDistribution.interestFreeLoans.toFixed(2)
      this.numPeopleAccounts = this.cycleDataForm.numPeopleAccounts.toFixed(2)
      this.numOrganizationAccounts = this.cycleDataForm.numOrganizationAccounts.toFixed(2)
      this.numBdcs = this.cycleDataForm.numBdcs.toFixed(2)
      console.log('After Sync Form:', this.getSimulationState)
    }
  },
  filters: {
    format (price) {
      console.log('price', price)
      let format = new Intl.NumberFormat('nl-NL').format(price)
      console.log('format', format)
      return format
    }
  }
}

// Vue.filter('currencyDisplay', {
//   // model -> view
//   // formats the value when updating the input element.
//   read: function (val) {
//     return '$' + val.toFixed(2)
//   },
//   // view -> model
//   // formats the value when updating the data.
//   write: function (val, oldVal) {
//     var number = +val.replace(/[^\d.]/g, '')
//     return isNaN(number) ? 0 : number
//   }
// })
</script>

<style lang="sass" scoped>
.cycle-form
.form-group
    border: 1px solid
    border-color: gray
    padding: 5px
.scroll-container
    height: calc(100vh - 130px)
    max-width: 100%
.c_input
    background-color: inherit
    flex: 1
    border: none
.c_input:focus
    background-color: inherit
    flex: 1
    border: none !important
input:focus, textarea:focus, select:focus
    outline: none
</style>
