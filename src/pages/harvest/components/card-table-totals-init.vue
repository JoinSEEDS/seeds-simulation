<template lang="pug">
  #Container(v-if="data")
    .row.q-col-gutter-md
      .col
        group-container(:icon="false" title="Initial Seeds" :class="{'bg-grey-5 tableSelected': selected}")
          .row.q-col-gutter-md
            .col-6
              q-card.cardItem.q-pa-lg
                .row.justify-center
                  img.icon(src="~/assets/functionIcon.png")
                  span.text-white.text-center.q-mx-sm.text-title {{$t('pages.tableCard.supply')}}
                .text-white.text-center.text-value {{generalStatesInitTable.data.totalSeeds | formatToMoney}}
            .col-6
              q-card.cardItem.q-pa-lg
                .row.justify-center
                  img.icon(src="~/assets/circulatingIcon.png")
                  .text-white.text-center.q-mx-sm.text-title {{$t('pages.tableCard.circulating')}}
                .text-white.text-center.text-value {{generalStatesInitTable.data.totalCirculatingSeeds | formatToMoney}}
            .col-6
              q-card.cardItem.q-pa-lg
                .row.justify-center
                  img.icon(src="~/assets/plantedIcon.png")
                  .text-white.text-center.q-mx-sm.text-title {{$t('pages.tableCard.planted')}}
                .text-white.text-center.text-value {{generalStatesInitTable.data.totalSeedsPlanted | formatToMoney}}
            .col-6
              q-card.cardItem.q-pa-lg
                .row.justify-center
                  img.icon(src="~/assets/burnedIcon.png")
                  .text-white.text-center.q-mx-sm.text-title {{$t('pages.tableCard.burned')}}
                .text-white.text-center.text-value {{generalStatesInitTable.data.totalSeedsBurned | formatToMoney}}
      .col
         group-container.fh(:icon="false" title="Initial Economics" :class="{'bg-grey-5 tableSelected': selected}")
          .row.q-col-gutter-md.justify-center
            .col-6
              q-card.cardItem.q-pa-lg
                .row.justify-center
                  img.icon(src="~/assets/burnedIcon.png")
                  .text-white.text-center.q-mx-sm.text-title {{$t('pages.tableCard.totalGEV')}}
                .text-white.text-center.text-value {{generalStatesInitTable.data.totalGEV | formatToMoney}}
</template>

<script>
import groupContainer from '~/components/group-container'
import { mapState } from 'vuex'
export default {
  name: 'card-table-totals-init',
  props: {
    data: {
      type: Object
    },
    selected: {
      type: Boolean
    }
  },
  components: { groupContainer },
  computed: {
    ...mapState('harvest', ['generalStatesInitTable'])
  }
}
</script>

<style lang="sass" scoped>
  .fh
    // background-color: #1F8BA8
    // min-height: 90%
  #Container
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
