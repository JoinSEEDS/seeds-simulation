<template lang="pug">
  q-card.container.q-pa-sm
    q-item
        q-item-section {{simulation.name}}
        q-item-section(avatar)
          q-icon(color="primary" name="bluetooth")
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

</style>
