<template lang="pug">
    .full-width(ref="container")
        div.container-title
            p.text-h6.text-center {{titleTable}}
        div.container-subtitle
            p.text-overline.text-center {{subtitleTable}}
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
      default: 'Subtitle'
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
    color: blue
    background-color: red
  .container-subtitle
    color: red
    background-color: blue
  p
    margin: 0px
</style>
