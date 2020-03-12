<template lang="pug">
    q-input.text-right(
        v-if="value && value.display != null"
        v-bind:value="value.display"
        @input=" e => updateModel(e)"
        :label="label"
        type="number"
        suffix="%"
        :rules="rules"
        :readonly="readonly"
    )
</template>

<script>
export default {
  name: 'percentage-input',
  props: {
    value: {},
    label: { type: String },
    scale: { type: String, default: '100' },
    readonly: {},
    rules: { type: Array }
  },
  data () {
    return {
      last: ''
    }
  },
  mounted () {
    if (!isNaN(this.value)) {
      this.$emit('input', { display: this.value * Number(this.scale), value: this.value })
    } else if (!this.value || this.value.display == null) {
      this.$emit('input', { display: '0', value: 0 })
    } else {
      const model = {
        display: this.value.display * Number(this.scale),
        value: this.value.display
      }
      this.$emit('input', model)
    }
  },
  watch: {
    value (newValue) {
      if (newValue.display === '' || isNaN(newValue.value)) {
        this.value.display = 0
        this.value.value = 0
      }
    //   console.log('Watching value', newValue)
    }
  },
  methods: {
    updateModel (e) {
      if (this.last === e) return
      this.last = e
      const model = {
        display: e,
        value: parseFloat(e) / Number(this.scale)
      }
      this.$emit('input', model)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
