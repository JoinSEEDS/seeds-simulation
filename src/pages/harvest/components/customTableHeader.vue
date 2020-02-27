<template lang="pug">
    .full-width(ref="container")
        div.container-title
            p.text-h6.text-center {{titleTable}}
        div.container-subtitle(v-if="subtitleTable")
            p.text-overline.text-center Total Amount: {{subtitleTable.toFixed(2)}}
</template>

<script>
export default {
  name: 'custom-table-header',
  model: {
    prop: ['titleTable', 'subtitleTable']
  },
  props: {
    titleTable: {
      default: 'Title'
    },
    subtitleTable: {
      default: undefined
    }
  },
  mounted () {
    // console.log('Custom container', this.$refs.container.parentElement)
    this.$refs.container.parentElement.classList.remove('q-table__top')
  }
}
</script>

<style lang="sass" scoped>
  .container-title
    color: #ffffff
    background-color: #1a237e
  .container-subtitle
    color: #ffffff
    background-color: #514aac
  p
    margin: 0px
</style>
