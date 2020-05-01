<template lang="pug">
    q-input(
      :value="value"
      :label="label"
      :rules="rules"
      :filled="filled"
      :outline="outline"
      @input="v => $emit('input', v)"
      debounce="800"
      :color="bgColor"
      :icon="icon"
      clearable
      clear-icon="close"
      dense
    )
        template(v-slot:prepend)
          q-icon(:name="icon")
        //- template(v-slot:append)
        //-   q-icon(:name="icon")
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
