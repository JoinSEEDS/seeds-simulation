<template lang="pug">
  #containerHeader.full-width(ref="container")
    div.bg-secondary.text-white.header
        p.text-h6.text-center {{titleTable}}
    div.row.justify-between.items-center.container-subtitle.q-px-md.q-pt-sm.q-pb-sm(v-if="subtitleTable")
        p.text-center Total Amount: {{this.formatToMoney(subtitleTable)}}
        #contSelect.select(@click.stop="prevent")
          q-select.selectC(
            label-color="white"
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
  watch: {
    optionSelected () {
      this.$refs.container.click()
    }
  },
  mounted () {
    // console.log('Custom container', this.$refs.container.parentElement)
    this.$refs.container.parentElement.classList.remove('q-table__top')
  },
  methods: {
    prevent (event) {
      // console.log('Try prevent', event)
      event.preventDefault()
    }
  }
}
</script>

<style lang="sass">
  #contSelect .q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input, .q-field__append
    color: #ffffff !important
  #containerHeader .selectClass span
    color: #ffffff
  #containerHeader .container-title
    color: #ffffff
    background-color: #1a237e
  #containerHeader .container-subtitle
    color: #ffffff
    background-color: #514aac
  #containerHeader p
    margin: 0px
  #containerHeader .header
    border-radius: 5px 5px 0px 0px
  #containerHeader .select
    min-width: 200px
</style>
