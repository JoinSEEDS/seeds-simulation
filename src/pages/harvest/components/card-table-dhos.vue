<template lang="pug">
  #Container.q-card(v-if="data" :class="{'bg-grey-5 tableSelected': selected}")
    q-scroll-area.scroll-size
      .row.full-width(v-for=" (dho, index) in data")
        .col-sm-6
          .cardHeader.bg-primary
            .title-header.text-white DHO {{ index + 1 }}
        .col-sm-6
          .cardItem
            .text-value.text-center {{ dho.distAmount | formatToMoney}}
      .row.full-width
        .col-sm-6
          .cardHeader.bg-primary
            .title-header.text-white {{$t('pages.tableCard.totalAmount')}}
        .col-sm-6
          .cardItem
            .text-value.text-center {{ totalAmount | formatToMoney }}
</template>

<script>
import groupContainer from '~/components/group-container'
export default {
  name: 'card-table-dhos',
  props: {
    data: {
      type: Array
    },
    selected: {
      type: Boolean
    },
    totalAmount: {
      type: Number
    }
  },
  components: { groupContainer }
}
</script>

<style lang="sass" scoped>
  .cardItem
    // background-color: #1F8BA8
    justify-content: 'center'
    text-align: 'center'
    padding: 22px
  .cardHeader
    padding: 22px
    background-color: #1F8BA8
    justify-content: 'center'
    text-align: 'center'
    overflow-wrap: 'break-word'
  .icon
    height: 25px
    width: 25px
  .tableSelected
    border-radius: 5px
  .title-header
    white-space: nowrap
    text-overflow: ellipsis
    overflow: hidden

  #Container
    // max-height: 300px
    height: 350px
  .scroll-size
    height: 350px
    max-height: 350px
</style>
