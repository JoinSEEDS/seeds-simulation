<template lang="pug">
.container
  //- Item Card
  q-card.container.q-pa-sm
    q-item
        q-item-section
            q-item-label(v-if="!owner" caption) {{simulation.creatorAccount}}
            q-item-label {{simulation.name}}
        q-item-section(side v-if="owner")
            q-icon.cursor-pointer(color="negative" name="delete" @click="showConfirmDelete = true")
        q-item-section(side)
            q-icon.cursor-pointer(color="primary" name="cloud_download" @click="applySimulation")
            //- q-icon(color="primary" name="cloud_download")
    q-expansion-item(
      icon="description"
      :label="$t('pages.general.description')"
      group="description"
    )
      p.q-pa-md {{simulation.description}}
  //- Confirm modal delete
  q-dialog(v-model="showConfirmDelete" persistent)
    q-card
      q-card-section.vertical-middle
        q-avatar(icon="delete" color="negative" text-color="white")
        span.text-weight-bold.q-ml-sm '{{this.simulation.name}}' {{$t('pages.saveSimulation.deleteSimulationMessage')}}
        p.q-ml-sm.text-center {{$t('pages.general.confirmActions')}}

      q-card-actions.float-right
        q-btn(flat label="Cancel" color="secondary" v-close-popup)
        q-btn(flat :label="$t('common.buttons.delete')" color="negative" @click="onDeleteSimulation")
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'simulation-item',
  props: {
    simulation: {
      type: Object
    }
  },
  data () {
    return {
      showConfirmDelete: false
    }
  },
  computed: {
    ...mapState('accounts', ['account']),
    owner () {
      return this.simulation.creatorAccount === this.account
    }
  },
  methods: {
    ...mapActions('simulations', ['getSimulationData', 'deleteSimulation']),
    async applySimulation () {
      await this.getSimulationData(this.simulation.s3Key)
      // this.$emit('simulationApplied', this.simulation.id)
    },
    async onDeleteSimulation () {
      this.showConfirmDelete = false
      try {
        const response = await this.deleteSimulation({
          id: this.simulation.id,
          account: this.account
        })
        console.log(response)
        this.showNotification(this.$t('pages.saveSimulation.simulationDeleted'))
        this.$emit('deleteSimulation', this.simulation)
      } catch (error) {
        this.showNotification(error, 'error')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  z-index: 0
</style>
