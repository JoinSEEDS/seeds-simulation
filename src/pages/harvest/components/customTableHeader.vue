<template lang="pug">
  .full-width(ref="container")
    div.bg-secondary.text-white.header
        p.text-h6.text-center {{titleTable}}
    div.row.justify-between.items-center.container-subtitle.q-pl-md.q-pt-sm.q-pb-sm(v-if="subtitleTable")
        p.text-center Total Amount: {{this.formatToMoney(subtitleTable)}}
        div.select
          q-select(
            dense
            v-model="optionSelected"
            :options="options"
            label="Show"
            emit-value
            map-options
            @input="$emit('update:showAll', $event)"
          )
        //- p Show all percentiles
        //-     q-toggle(
        //-       v-model="expandEntries",
        //-       @input="$emit('update:showAll', $event)"
        //-     )
</template>

<script>
export default {
  name: 'custom-table-header',
  model: {
    prop: ['titleTable', 'subtitleTable', 'expandEntries']
  },
  props: {
    titleTable: {
      default: 'Title'
    },
    subtitleTable: {
      default: undefined
    },
    tableId: {
      default: undefined
    }
  },
  data () {
    return {
      expandEntries: false,
      optionSelected: 1,
      options: [
        {
          value: 1,
          label: 'First - Fiddle - Last'
        },
        {
          value: 2,
          label: 'Every 10'
        },
        {
          value: 3,
          label: 'All'
        }
      ]
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
  .header
    border-radius: 5px 5px 0px 0px
  .select
    min-width: 200px
</style>
