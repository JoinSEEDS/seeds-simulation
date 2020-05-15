<template lang="pug">
  #Container(v-if="data")
    group-container(title="eeds Growth" :class="{'bg-grey-5 tableSelected': selected}")
      .row.q-col-gutter-md
        .col-6
          q-card.cardItem.q-pa-lg
            .row.justify-center
              img.icon(src="~/assets/per3CyclesIcon.png")
              span.text-title.text-white.text-center.q-mx-sm {{$t('pages.tableCard.per3Cycles')}}
            .text-value.text-white.text-center {{data.seeds3cycles | formatToMoney}}
        .col-6
          q-card.cardItem.q-pa-lg
            .row.justify-center
              img.icon(src="~/assets/perBlockIcon.png")
              .text-title.text-white.text-center.q-mx-sm {{$t('pages.tableCard.perBlock')}}
            .text-value.text-white.text-center {{data.seedsPerBlock | formatToMoney}}
        .col-6
          q-card.cardItem.q-pa-lg
            .row.justify-center
              img.icon(src="~/assets/perCycleIcon.png")
              .text-title.text-white.text-center.q-mx-sm {{$t('pages.tableCard.perCycle')}}
            .text-value.text-white.text-center {{data.seedsPerCycle | formatToMoney}}
</template>

<script>
import groupContainer from '~/components/group-container'
export default {
  name: 'card-table-growth',
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
    background-color: #1F8BA8
    justify-content: 'center'
    text-align: 'center'
  .icon
    height: 25px
    width: 25px
  .tableSelected
    border-radius: 5px
  .text-title
    height: 22.65px
    color: #FFF
    font-family: "Helvetica Neue"
    font-size: 14px
    font-weight: 700
    line-height: 17px
  .text-value
    height: 33.11px
    color: #FFF
    font-family: "Helvetica Neue"
    font-size: 18px
    line-height: 21px
    margin-top: 10px
  #Container
    max-height: 300px
</style>
