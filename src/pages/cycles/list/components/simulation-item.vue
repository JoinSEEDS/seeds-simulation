<template lang="pug">
  q-card.container.q-pa-sm
    q-item
        q-item-section
            q-item-label(v-if="!owner" caption) {{simulation.creatorAccount}}
            q-item-label {{simulation.name}}
        q-item-section(side v-if="owner")
            q-icon.cursor-pointer(color="negative" name="delete")
        q-item-section(side)
            q-icon.cursor-pointer(color="primary" name="cloud_download")
            //- q-icon(color="primary" name="cloud_download")
    q-expansion-item(
      icon="description"
      :label="$t('pages.general.description')"
      group="description"
    )
      p.q-pa-md {{simulation.description}}
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'simulation-item',
  props: {
    simulation: {
      type: Object
    }
  },
  computed: {
    ...mapState('accounts', ['account']),
    owner () {
      // console.log(`account ${this.account} vs creator ${this.simulation.creatorAccount}`)
      return this.simulation.creatorAccount === this.account
    }
  }
}
</script>

<style lang="sass" scoped>
.container
</style>
