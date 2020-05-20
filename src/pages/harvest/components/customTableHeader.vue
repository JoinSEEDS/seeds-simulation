<template lang="pug">
  #containerHeader.full-width(ref="container")
    div.container-title.text-white.header
      .row.justify-center
        img.icon(:src="require(`assets/${iconSrc}.png`)" v-if="iconSrc")
        p.titleTable {{titleTable}}
    div.row.justify-between.items-center.container-subtitle.q-px-md(v-if="subtitleTable")
        p.text-center Total Amount: {{this.formatToMoney(subtitleTable)}}
        #contSelect.select(@click.stop="prevent")
          q-select.selectC(
            label-color="white"
            dense
            v-model="optionSelected"
            :options="options"
            label="Granularity"
            emit-value
            map-options
            @input="$emit('update:showAll', $event)"
          )
    .div-else.row.container-subtitle.q-px-md.q-pt-sm.q-pb-sm(v-else)
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
    },
    iconSrc: {
      type: String
    }
  },
  data () {
    return {
      expandEntries: false,
      optionSelected: 1,
      options: [
        {
          value: 1,
          label: 'First - Middle - Last'
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
  #contSelect .q-field__native, #contSelect .q-field__prefix,#contSelect .q-field__suffix,#contSelect .q-field__input,#contSelect .q-field__append
    color: #ffffff !important
  #containerHeader .selectClass span
    color: #ffffff
  #containerHeader .container-title
    color: #ffffff
    background-color: #242626
  #containerHeader .container-subtitle
    color: #ffffff
    background-color: #242626
  .containerTitle
    background-color: #242626
  #containerHeader p
    margin: 0px
  #containerHeader .header
    border-radius: 5px 5px 0px 0px
  #containerHeader .select
    min-width: 160px
  #containerHeader .icon
    width: 25px
    height: 25px
    padding: 2px
    margin-top: 2px
  #containerHeader .titleTable
    margin: 5px 5px 0px 5px
    // height: 42px
    color: #FFF
    font-family: "Helvetica Neue"
    font-size: 18px
    letter-spacing: 0.75px
    line-height: 21px
  #containerHeader .div-else
    height: 39px
</style>
