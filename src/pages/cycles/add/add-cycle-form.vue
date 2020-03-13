<template lang="pug">
    #container.q-gutter-y-sm
        q-scroll-area.scroll-container
            .template-form
                q-form.q-gutter-y-sm
                    q-list(bordered)
                        //- GPD
                        q-expansion-item(
                            group="formGroup"
                            :label="$t('forms.cycles.groupGDP')"
                            default-opened
                            header-class="text-positive"
                        )
                          q-card
                            q-card-section.q-gutter-y-sm
                                money-input(
                                    v-model='circulatingSeeds'
                                    :label="$t('forms.cycles.circulatingSeeds')"
                                    :rules="[rules.positiveInteger]"
                                    prefix="$"
                                )
                                p Hi {{ volumeGrowth }}
                                percentage-input(
                                    v-model='volumeGrowth'
                                    :label="$t('forms.cycles.volumeGrowth')"
                                    :rules="[rules.positiveInteger]"
                                    prefix="$"
                                )
                                money-input(
                                    v-model='numPeopleAccounts'
                                    :label="$t('forms.cycles.numPeopleAccounts')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='numPeopleAccounts' :label="$t('forms.cycles.numPeopleAccounts')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                money-input(
                                    v-model='numOrganizationAccounts'
                                    :label="$t('forms.cycles.numOrganizationAccounts')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='numOrganizationAccounts' :label="$t('forms.cycles.numOrganizationAccounts')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                money-input(
                                    v-model='numBdcs'
                                    :label="$t('forms.cycles.numBdcs')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='numBdcs' :label="$t('forms.cycles.numBdcs')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')

                        q-separator
                        //- Seeds Remove
                        q-expansion-item(
                            group="formGroup"
                            :label="labelSeedsRemoves"
                            header-class="text-positive"
                        )
                          q-card
                            q-card-section.q-gutter-y-sm
                                money-input(
                                    v-model='seedsDestroyed'
                                    :label="$t('forms.cycles.seedsDestroyed')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='seedsDestroyed' :label="$t('forms.cycles.seedsDestroyed')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                money-input(
                                    v-model='plantedSeeds'
                                    :label="$t('forms.cycles.plantedSeeds')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='plantedSeeds' :label="$t('forms.cycles.plantedSeeds')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                money-input(
                                    v-model='enterExchanges'
                                    :label="$t('forms.cycles.enterExchanges')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='enterExchanges' :label="$t('forms.cycles.enterExchanges')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='enterExchangesWeight'
                                    :label="$t('forms.cycles.enterExchangesWeight')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='enterExchangesWeight' :label="$t('forms.cycles.enterExchangesWeight')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                money-input(
                                    v-model='enterSeedsBank'
                                    :label="$t('forms.cycles.enterSeedsBank')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='enterSeedsBank' :label="$t('forms.cycles.enterSeedsBank')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                        q-separator
                        //- Seeds Introduce
                        q-expansion-item(
                            group="formGroup"
                            :label="labelSeedsIntroduce"
                            header-class="text-positive"
                        )
                          q-card
                            q-card-section.q-gutter-y-sm
                                money-input(
                                    v-model='unplantedSeeds'
                                    :label="$t('forms.cycles.unplantedSeeds')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='unplantedSeeds' :label="$t('forms.cycles.unplantedSeeds')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                money-input(
                                    v-model='exitExchanges'
                                    :label="$t('forms.cycles.exitExchanges')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='exitExchanges' :label="$t('forms.cycles.exitExchanges')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='exitExchangesWeight'
                                    :label="$t('forms.cycles.exitExchangesWeight')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='exitExchangesWeight' :label="$t('forms.cycles.exitExchangesWeight')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                money-input(
                                    v-model='exitSeedsBank'
                                    :label="$t('forms.cycles.exitSeedsBank')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='exitSeedsBank' :label="$t('forms.cycles.exitSeedsBank')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                        q-separator
                        //- Harvest Distribution
                        q-expansion-item(
                            group="formGroup"
                            :label="$t('forms.cycles.groupHarvestDistribution')"
                            header-class="text-positive"
                        )
                          q-card
                            q-card-section.q-gutter-y-sm
                                percentage-input(
                                    v-model='gdc'
                                    :label="$t('forms.cycles.gdc')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='gdc' :label="$t('forms.cycles.gdc')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='bdc'
                                    :label="$t('forms.cycles.bdc')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='bdc' :label="$t('forms.cycles.bdc')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='organizations'
                                    :label="$t('forms.cycles.organizations')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='organizations' :label="$t('forms.cycles.organizations')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='accounts'
                                    :label="$t('forms.cycles.accounts')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='accounts' :label="$t('forms.cycles.accounts')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                        q-separator
                        //- BDC Distribution
                        q-expansion-item(
                            group="formGroup"
                            :label="$t('forms.cycles.groupBDCDistribution')"
                            header-class="text-positive"
                        )
                          q-card
                            q-card-section.q-gutter-y-sm
                                percentage-input(
                                    v-model='regenGrantsBDC'
                                    :label="$t('forms.cycles.regenGrantsBDC')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='regenGrantsBDC' :label="$t('forms.cycles.regenGrantsBDC')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='regenLoans'
                                    :label="$t('forms.cycles.regenLoans')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='regenLoans' :label="$t('forms.cycles.regenLoans')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='openProposal'
                                    :label="$t('forms.cycles.openProposal')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='openProposal' :label="$t('forms.cycles.openProposal')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                        q-separator
                        //- GDC Distribution
                        q-expansion-item(
                            group="formGroup"
                            :label="$t('forms.cycles.groupGDCDistribution')"
                            header-class="text-positive"
                        )
                          q-card
                            q-card-section.q-gutter-y-sm
                                percentage-input(
                                    v-model='networkMaintenance'
                                    :label="$t('forms.cycles.networkMaintenance')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='networkMaintenance' :label="$t('forms.cycles.networkMaintenance')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='regenGrantsGDC'
                                    :label="$t('forms.cycles.regenGrantsGDC')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='regenGrantsGDC' :label="$t('forms.cycles.regenGrantsGDC')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='coreDevelopment'
                                    :label="$t('forms.cycles.coreDevelopment')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='coreDevelopment' :label="$t('forms.cycles.coreDevelopment')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='interestFreeLoans'
                                    :label="$t('forms.cycles.interestFreeLoans')"
                                    :rules="[rules.positiveInteger]"
                                )
                                //- q-field(filled v-model='interestFreeLoans' :label="$t('forms.cycles.interestFreeLoans')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                        q-separator
                    //- Hidden Fields
                    //- q-field(v-if="!hideFields" filled v-model='percentageOfHarvestAssignedCirculating' :label="$t('forms.cycles.percentageOfHarvestAssignedCirculating')")
                    //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                    //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                    //- q-field(v-if="!hideFields" filled v-model='maxPercentageAccounts' :label="$t('forms.cycles.maxPercentageAccounts')")
                    //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                    //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                    //- q-field(v-if="!hideFields" filled v-model='maxPercentageOrganizations' :label="$t('forms.cycles.maxPercentageOrganizations')")
                    //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                    //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                    //- q-field(v-if="!hideFields" filled v-model='maxPercentageBdc' :label="$t('forms.cycles.maxPercentageBdc')")
                        template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                            input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
        .row.justify-around.items-center
            .column.justify-center
              .col-2
                  q-btn(round :disabled="simulationStep == 0 || simulationStep - 1 == 0" color="secondary" icon="skip_previous" @click="() => backCycle()")
            .column.justify-center
              .col-6
                p {{simulationStep - 1}} / {{totalSimulationSteps - 1}}
            .column.justify-center
              .col-2
                  q-btn(round color="secondary" icon="skip_next" @click="() => nextCycle()")
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
// import Vue from 'vue'
import { VMoney } from 'v-money'
import { MoneyInput, PercentageInput } from '~/components/jmInputs'
import { validation } from '~/mixins/validation'
export default {
  name: 'add-cycle-form',
  directives: { money: VMoney },
  components: { MoneyInput, PercentageInput },
  mixins: [ validation ],
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
      numBdcs: 0,
      // - Variables
      hideFields: true
    }
  },
  computed: {
    ...mapGetters('harvest', ['simulationStep', 'totalSimulationSteps', 'cycleDataForm', 'getSimulationState']),
    labelSeedsRemoves () {
      return this.getSimulationState.length > 0 ? this.$t('forms.cycles.groupSeedsRemove') + ': ' + this.getSimulationState[this.simulationStep - 1].seedsRemoved3Cycles : this.$t('forms.cycles.groupSeedsRemove')
    },
    labelSeedsIntroduce () {
      return this.getSimulationState.length > 0 ? this.$t('forms.cycles.groupSeedsIntroduce') + ': ' + this.getSimulationState[this.simulationStep - 1].seedsIntroducedPrevious3Cycles : this.$t('forms.cycles.groupSeedsIntroduce')
    }
  },
  beforeMount () {
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
    //   console.log('Before next:', JSON.stringify(this.getSimulationState, null, 4))
      console.log('DoCycle Init:', this)
      const simulationState = {
        circulatingSeeds: this.circulatingSeeds.value,
        volumeGrowth: this.volumeGrowth.value,
        // changeRequiredToMeetDemand: 33339041.096,
        seedsDestroyed: this.seedsDestroyed.value,
        plantedSeeds: this.plantedSeeds.value,
        enterExchanges: this.enterExchanges.value,
        enterExchangesWeight: this.enterExchangesWeight.value,
        enterSeedsBank: this.enterSeedsBank.value,
        // seedsRemoved3Cycles: 26681232.878,
        unplantedSeeds: this.unplantedSeeds.value,
        exitExchanges: this.exitExchanges.value,
        exitExchangesWeight: this.exitExchangesWeight.value,
        exitSeedsBank: this.exitSeedsBank.value,
        // seedsIntroducedPrevious3Cycles: 14669178.079,
        // seedsGrownPerCycle: 15117031.964999998,
        percentageOfHarvestAssignedCirculating: parseFloat(this.percentageOfHarvestAssignedCirculating),
        percentageDistributionOfNewHarvest: { gdc: this.gdc.value, bdc: this.bdc.value, organizations: this.organizations.value, accounts: this.accounts.value },
        maxPercentageAccounts: parseFloat(this.maxPercentageAccounts),
        maxPercentageOrganizations: parseFloat(this.maxPercentageOrganizations),
        maxPercentageBdc: parseFloat(this.maxPercentageBdc),
        bdcPercentagesDistribution: { regenGrants: this.regenGrantsBDC.value, regenLoans: this.regenLoans.value, openProposal: this.openProposal.value },
        gdcPercentagesDistribution: {
          networkMaintenance: this.networkMaintenance.value,
          regenGrants: this.regenGrantsGDC.value,
          coreDevelopment: this.coreDevelopment.value,
          interestFreeLoans: this.interestFreeLoans.value
        },
        numPeopleAccounts: this.numPeopleAccounts.value,
        numOrganizationAccounts: this.numOrganizationAccounts.value,
        numBdcs: this.numBdcs.value
        // harvestDistribution: {}
      }
      console.log('DoCycle Data:', simulationState)
      this.doCycle(
        {
          simulationState, step: (this.simulationStep - 1)
        })
    //   console.log('After next:', this.getSimulationState)
    },
    syncFormData () {
      //   console.log('Before Sync Form:', this.getSimulationState)
      console.log('Before Sync Form: volumeGrowth ', this.cycleDataForm)
      this.circulatingSeeds = parseFloat(this.cycleDataForm.circulatingSeeds).toFixed(2)
      this.volumeGrowth = parseFloat(this.cycleDataForm.volumeGrowth)
      this.seedsDestroyed = parseFloat(this.cycleDataForm.seedsDestroyed).toFixed(2)
      this.plantedSeeds = parseFloat(this.cycleDataForm.plantedSeeds).toFixed(2)
      this.enterExchanges = parseFloat(this.cycleDataForm.enterExchanges).toFixed(2)
      this.enterExchangesWeight = parseFloat(this.cycleDataForm.enterExchangesWeight)
      this.enterSeedsBank = parseFloat(this.cycleDataForm.enterSeedsBank).toFixed(2)
      this.unplantedSeeds = parseFloat(this.cycleDataForm.unplantedSeeds).toFixed(2)
      this.exitExchanges = parseFloat(this.cycleDataForm.exitExchanges).toFixed(2)
      this.exitExchangesWeight = parseFloat(this.cycleDataForm.exitExchangesWeight)
      this.exitSeedsBank = parseFloat(this.cycleDataForm.exitSeedsBank).toFixed(2)
      this.percentageOfHarvestAssignedCirculating = parseFloat(this.cycleDataForm.percentageOfHarvestAssignedCirculating).toFixed(2)
      this.gdc = parseFloat(this.cycleDataForm.percentageDistributionOfNewHarvest.gdc)
      this.bdc = parseFloat(this.cycleDataForm.percentageDistributionOfNewHarvest.bdc)
      this.organizations = parseFloat(this.cycleDataForm.percentageDistributionOfNewHarvest.organizations)
      this.accounts = parseFloat(this.cycleDataForm.percentageDistributionOfNewHarvest.accounts)
      this.maxPercentageAccounts = parseFloat(this.cycleDataForm.maxPercentageAccounts).toFixed(2)
      this.maxPercentageOrganizations = parseFloat(this.cycleDataForm.maxPercentageOrganizations).toFixed(2)
      this.maxPercentageBdc = parseFloat(this.cycleDataForm.maxPercentageBdc).toFixed(2)
      this.regenGrantsBDC = parseFloat(this.cycleDataForm.bdcPercentagesDistribution.regenGrants)
      this.regenLoans = parseFloat(this.cycleDataForm.bdcPercentagesDistribution.regenLoans)
      this.openProposal = parseFloat(this.cycleDataForm.bdcPercentagesDistribution.openProposal)
      this.networkMaintenance = parseFloat(this.cycleDataForm.gdcPercentagesDistribution.networkMaintenance)
      this.regenGrantsGDC = parseFloat(this.cycleDataForm.gdcPercentagesDistribution.regenGrants)
      this.coreDevelopment = parseFloat(this.cycleDataForm.gdcPercentagesDistribution.coreDevelopment)
      this.interestFreeLoans = parseFloat(this.cycleDataForm.gdcPercentagesDistribution.interestFreeLoans)
      this.numPeopleAccounts = parseFloat(this.cycleDataForm.numPeopleAccounts).toFixed(2)
      this.numOrganizationAccounts = parseFloat(this.cycleDataForm.numOrganizationAccounts).toFixed(2)
      this.numBdcs = parseFloat(this.cycleDataForm.numBdcs).toFixed(2)
      //   console.log('After Sync Form:', this.getSimulationState)
    },
    cleanFormat (value) {
      console.log('Clean Match', value)
      var match = value.match(/[0-9,.]*/)
      let amount
      if (match !== null) {
        amount = parseFloat(match[0].replace(/,/g, '')) // replace , thousands separator
      }
      return amount
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
