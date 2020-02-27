<template lang="pug">
    #container.q-ma-md.q-gutter-y-sm
        q-scroll-area.scroll-container
            .template-form
                q-form.q-gutter-y-sm
                    q-input(filled
                        v-model="circulatingSeeds"
                        :label="$t('forms.cycles.circulatingSeeds')"
                        type="number")
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
                    q-btn(round :disabled="simulationStep == 0" color="secondary" icon="skip_previous" @click="backCycle")
            .column.justify-center
                .col-6
                 p {{simulationStep}} / {{totalSimulationSteps}}
            .column.justify-center
                .col-3
                 q-btn(round color="secondary" icon="skip_next" @click="nextCycle")
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'add-cycle-form',
  data () {
    return {
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
    ...mapGetters('harvest', ['simulationStep', 'totalSimulationSteps', 'cycleDataForm'])
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
      this.setSimulationStep((this.simulationStep - 1))
    },
    nextCycle () {
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
    },
    syncFormData () {
      this.circulatingSeeds = this.cycleDataForm.circulatingSeeds
      this.volumeGrowth = this.cycleDataForm.volumeGrowth
      this.seedsDestroyed = this.cycleDataForm.seedsDestroyed
      this.plantedSeeds = this.cycleDataForm.plantedSeeds
      this.enterExchanges = this.cycleDataForm.enterExchanges
      this.enterExchangesWeight = this.cycleDataForm.enterExchangesWeight
      this.enterSeedsBank = this.cycleDataForm.enterSeedsBank
      this.unplantedSeeds = this.cycleDataForm.unplantedSeeds
      this.exitExchanges = this.cycleDataForm.exitExchanges
      this.exitExchangesWeight = this.cycleDataForm.exitExchangesWeight
      this.exitSeedsBank = this.cycleDataForm.exitSeedsBank
      this.percentageOfHarvestAssignedCirculating = this.cycleDataForm.percentageOfHarvestAssignedCirculating
      this.gdc = this.cycleDataForm.percentageDistributionOfNewHarvest.gdc
      this.bdc = this.cycleDataForm.percentageDistributionOfNewHarvest.bdc
      this.organizations = this.cycleDataForm.percentageDistributionOfNewHarvest.organizations
      this.accounts = this.cycleDataForm.percentageDistributionOfNewHarvest.accounts
      this.maxPercentageAccounts = this.cycleDataForm.maxPercentageAccounts
      this.maxPercentageOrganizations = this.cycleDataForm.maxPercentageOrganizations
      this.maxPercentageBdc = this.cycleDataForm.maxPercentageBdc
      this.regenGrantsBDC = this.cycleDataForm.bdcPercentagesDistribution.regenGrants
      this.regenLoans = this.cycleDataForm.bdcPercentagesDistribution.regenLoans
      this.openProposal = this.cycleDataForm.bdcPercentagesDistribution.openProposal
      this.networkMaintenance = this.cycleDataForm.gdcPercentagesDistribution.networkMaintenance
      this.regenGrantsGDC = this.cycleDataForm.gdcPercentagesDistribution.regenGrantsGDC
      this.coreDevelopment = this.cycleDataForm.gdcPercentagesDistribution.coreDevelopment
      this.interestFreeLoans = this.cycleDataForm.gdcPercentagesDistribution.interestFreeLoans
      this.numPeopleAccounts = this.cycleDataForm.numPeopleAccounts
      this.numOrganizationAccounts = this.cycleDataForm.numOrganizationAccounts
      this.numBdcs = this.cycleDataForm.numBdcs
    }
  }
}
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
</style>
