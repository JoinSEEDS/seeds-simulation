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
    const mDisplay = parseFloat(parseFloat(this.value) * parseFloat(this.scale)).toFixed(2)
    const mValue = parseFloat(this.value)
    if (!isNaN(mValue)) {
      this.$emit('input', { display: mDisplay, value: mValue })
    } else if (!this.value || this.value.display == null) {
      this.$emit('input', { display: '0', value: 0 })
    } else {
      const model = {
        display: mDisplay,
        value: mValue
      }
      this.$emit('input', model)
    }
  },
  watch: {
    value (newValue) {
      console.log('newValue percentage', newValue)
      if (!isNaN(parseFloat(this.value))) {
        const mDisplay = parseFloat(this.value) * parseFloat(this.scale)
        const mValue = parseFloat(this.value)
        this.$emit('input', { display: mDisplay, value: mValue })
      }
      // if (!isNaN(parseFloat(this.value))) {
      //   this.$emit('input', { display: parseFloat(this.value) * Number(this.scale), value: parseFloat(this.value) })
      // } else if (!this.value || this.value.display == null || newValue.display === '' || isNaN(newValue.value)) {
      //   this.$emit('input', { display: '0', value: 0 })
      // } else {
      //   const model = {
      //     display: this.value.display * Number(this.scale),
      //     value: this.value.display
      //   }
      //   this.$emit('input', model)
      // }
      // if (newValue.display === '' || isNaN(newValue.value)) {
      //   this.value.display = 0
      //   this.value.value = 0
      // }
    //   console.log('Watching value', newValue)
    }
  },
  methods: {
    updateModel (e) {
      if (this.last === e) return
      this.last = e
      const model = {
        display: e,
        value: parseFloat(e) / parseFloat(this.scale)
      }
      this.$emit('input', model)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
