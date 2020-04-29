<template lang="pug">
    q-input(

    )
</template>

<script>
export default {
  name: 'search-bar',
  props: {
    value: {},
    label: { type: String },
    rules: { type: Array },
    bgColor: {},
    filled: { type: Boolean },
    outline: { type: Boolean }
  }
}
</script>

<style lang="sass" scoped>

</style>
