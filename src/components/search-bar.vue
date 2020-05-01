<template lang="pug">
    q-input(
      :value="value"
      :label="label"
      :rules="rules"
      :filled="filled"
      :outline="outline"
      @input="v => $emit('input', v)"
      debounce="600"
      :color="bgColor"
      :icon="icon"
    )
        template(v-slot:prepend)
          q-icon(:name="icon")
</template>

<script>
export default {
  name: 'search-bar',
  props: {
    value: {},
    label: { type: String },
    rules: { type: Array },
    bgColor: {},
    icon: { type: String },
    filled: { type: Boolean },
    outline: { type: Boolean }
  }
}
</script>

<style lang="sass" scoped>

</style>
