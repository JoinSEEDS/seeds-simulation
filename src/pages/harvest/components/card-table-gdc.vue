<template lang="pug">
  #Container.q-card.q-gutter-y-xs(v-if="data" :class="{'bg-grey-5 tableSelected': selected}")
    .row.full-width
      .col-sm-6
        .cardHeader.bg-primary
          .title-header.text-white {{$t('pages.tableCard.networkMtn')}}
      .col-sm-6
        .cardItem
          .text-value.text-center {{data.networkMaintenance | formatToMoney}}
    .row.full-width
      .col-sm-6
        .cardHeader.bg-primary
          .title-header.text-white {{$t('pages.tableCard.regenGrants')}}
      .col-sm-6
        .cardItem
          .text-value.text-center {{data.regenGrants | formatToMoney}}
    .row.full-width
      .col-sm-6
        .cardHeader.bg-primary
          .title-header.text-white {{$t('pages.tableCard.coreDevelopment')}}
      .col-sm-6
        .cardItem
          .text-value.text-center {{data.coreDevelopment | formatToMoney}}
    .row.full-width
      .col-sm-6
        .cardHeader.bg-primary
          .title-header.text-white {{$t('pages.tableCard.interestFreeLoans')}}
      .col-sm-6
        .cardItem
          .text-value.text-center {{data.interestFreeLoans | formatToMoney}}
    .row.full-width
      .col-sm-6
        .cardHeader.bg-primary
          .title-header.text-white {{$t('pages.tableCard.totalAmount')}}
      .col-sm-6
        .cardItem
          .text-value.text-center {{data.totalAmountForGdc | formatToMoney}}
</template>

<script>
import groupContainer from '~/components/group-container'
export default {
  name: 'card-table-gdc',
  props: {
    data: {
      type: Object
    },
    selected: {
      type: Boolean
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
</style>
