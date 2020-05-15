<template lang="pug">
  #Container(v-if="data")
    group-container(title="eeds Totals" :class="{'bg-grey-5 tableSelected': selected}")
      .row.q-col-gutter-md
        .col-6
          q-card.cardItem.q-pa-lg
            .row.justify-center
              img.icon(src="~/assets/functionIcon.png")
              span.text-white.text-center.q-mx-sm.text-title {{$t('pages.tableCard.supply')}}
            .text-white.text-center.text-value {{data.totalSeeds | formatToMoney}}
        .col-6
          q-card.cardItem.q-pa-lg
            .row.justify-center
              img.icon(src="~/assets/circulatingIcon.png")
              .text-white.text-center.q-mx-sm.text-title {{$t('pages.tableCard.circulating')}}
            .text-white.text-center.text-value {{data.totalCirculatingSeeds | formatToMoney}}
        .col-6
          q-card.cardItem.q-pa-lg
            .row.justify-center
              img.icon(src="~/assets/plantedIcon.png")
              .text-white.text-center.q-mx-sm.text-title {{$t('pages.tableCard.planted')}}
            .text-white.text-center.text-value {{data.totalSeedsPlanted | formatToMoney}}
        .col-6
          q-card.cardItem.q-pa-lg
            .row.justify-center
              img.icon(src="~/assets/burnedIcon.png")
              .text-white.text-center.q-mx-sm.text-title {{$t('pages.tableCard.burned')}}
            .text-white.text-center.text-value {{data.totalSeedsBurned | formatToMoney}}
</template>

<script>
import groupContainer from '~/components/group-container'
export default {
  name: 'card-table-totals',
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
</style>
