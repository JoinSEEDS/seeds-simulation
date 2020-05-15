<template lang="pug">
  #Container(v-if="data")
    group-container(title="eeds Totals" :class="{'bg-grey-5 tableSelected': selected}")
      .row.q-col-gutter-md
        .col-6
          q-card.cardItem.q-pa-lg
            .row.justify-center
              img.icon(src="~/assets/functionIcon.png")
              span.text-h6.text-white.text-center.q-mx-sm {{$t('pages.tableCard.supply')}}
            .text-h6.text-white.text-center {{data.totalSeeds | formatToMoney}}
        .col-6
          q-card.cardItem.q-pa-lg
            .row.justify-center
              img.icon(src="~/assets/circulatingIcon.png")
              .text-h6.text-white.text-center.q-mx-sm {{$t('pages.tableCard.circulating')}}
            .text-h6.text-white.text-center {{data.totalCirculatingSeeds | formatToMoney}}
        .col-6
          q-card.cardItem.q-pa-lg
            .row.justify-center
              img.icon(src="~/assets/plantedIcon.png")
              .text-h6.text-white.text-center.q-mx-sm {{$t('pages.tableCard.planted')}}
            .text-h6.text-white.text-center {{data.totalSeedsPlanted | formatToMoney}}
        .col-6
          q-card.cardItem.q-pa-lg
            .row.justify-center
              img.icon(src="~/assets/burnedIcon.png")
              .text-h6.text-white.text-center.q-mx-sm {{$t('pages.tableCard.burned')}}
            .text-h6.text-white.text-center {{data.totalSeedsBurned | formatToMoney}}
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
</style>
