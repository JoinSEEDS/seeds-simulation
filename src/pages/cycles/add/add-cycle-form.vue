<template lang="pug">
    .template-form
        q-form.q-ma-md.q-gutter-y-md
            q-input(filled
                v-model="circulatingSeeds"
                label="circulatingSeeds"
                hint="circulatingSeeds"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="volumeGrowth"
                label="volumeGrowth"
                hint="volumeGrowth"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="seedsDestroyed"
                label="seedsDestroyed"
                hint="seedsDestroyed"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="plantedSeeds"
                label="plantedSeeds"
                hint="plantedSeeds"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="enterExchanges"
                label="enterExchanges"
                hint="enterExchanges"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="enterExchangesWeight"
                label="enterExchangesWeight"
                hint="enterExchangesWeight"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="enterSeedsBank"
                label="enterSeedsBank"
                hint="enterSeedsBank"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="unplantedSeeds"
                label="unplantedSeeds"
                hint="unplantedSeeds"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="exitExchanges"
                label="exitExchanges"
                hint="exitExchanges"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="exitExchangesWeight"
                label="exitExchangesWeight"
                hint="exitExchangesWeight"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="exitSeedsBank"
                label="exitSeedsBank"
                hint="exitSeedsBank"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="percentageOfHarvestAssignedCirculating"
                label="percentageOfHarvestAssignedCirculating"
                hint="percentageOfHarvestAssignedCirculating"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            div.form-group
                q-input(filled
                    v-model="gdc"
                    label="gdc"
                    hint="gdc"
                    type="number"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']")
                q-input(filled
                    v-model="bdc"
                    label="bdc"
                    hint="bdc"
                    type="number"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']")
                q-input(filled
                    v-model="organizations"
                    label="organizations"
                    hint="organizations"
                    type="number"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']")
                q-input(filled
                    v-model="accounts"
                    label="accounts"
                    hint="accounts"
                    type="number"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="maxPercentageAccounts"
                label="maxPercentageAccounts"
                hint="maxPercentageAccounts"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="maxPercentageOrganizations"
                label="maxPercentageOrganizations"
                hint="maxPercentageOrganizations"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="maxPercentageBdc"
                label="maxPercentageBdc"
                hint="maxPercentageBdc"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            div.form-group
                q-input(filled
                    v-model="regenGrantsBDC"
                    label="regenGrantsBDC"
                    hint="regenGrantsBDC"
                    type="number"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']")
                q-input(filled
                    v-model="regenLoans"
                    label="regenLoans"
                    hint="regenLoans"
                    type="number"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']")
                q-input(filled
                    v-model="openProposal"
                    label="openProposal"
                    hint="openProposal"
                    type="number"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']")
            div.form-group
                q-input(filled
                    v-model="networkMaintenance"
                    label="networkMaintenance"
                    hint="networkMaintenance"
                    type="number"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']")
                q-input(filled
                    v-model="regenGrantsGDC"
                    label="regenGrantsGDC"
                    hint="regenGrantsGDC"
                    type="number"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']")
                q-input(filled
                    v-model="coreDevelopment"
                    label="coreDevelopment"
                    hint="coreDevelopment"
                    type="number"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']")
                q-input(filled
                    v-model="interestFreeLoans"
                    label="interestFreeLoans"
                    hint="interestFreeLoans"
                    type="number"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="numPeopleAccounts"
                label="numPeopleAccounts"
                hint="numPeopleAccounts"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="numOrganizationAccounts"
                label="numOrganizationAccounts"
                hint="numOrganizationAccounts"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="numBdcs"
                label="numBdcs"
                hint="numBdcs"
                type="number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-btn.full-width(
                color="primary"
                label="Send"
                size="lg"
                unelevated
            )

</template>

<script>
export default {
  name: 'add-cycle-form',
  data () {
    return {
      name: '',
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
</style>
cycle-form
