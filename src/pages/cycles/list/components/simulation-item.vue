<template lang="pug">
  q-card.container.q-pa-sm
    q-item
        q-item-section
            q-item-label(v-if="simulation.user" caption) {{simulation.user}}
            q-item-label {{simulation.name}}
        q-item-section(side v-if="!simulation.user")
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
export default {
  name: 'simulation-item',
  props: {
    simulation: {
      type: Object
    }
  }
}
</script>

<style lang="sass" scoped>
.container
</style>
