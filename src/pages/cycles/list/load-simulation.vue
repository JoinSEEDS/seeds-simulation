<template lang="pug">
#Container
  q-tabs(
    v-model="tab"
    active-color="white"
    active-bg-color="primary"
    class="text-primary shadow-2"
    indicator-color="secondary"
    :breakpoint="0"
    align="justify"
  )
    q-tab(name="mySimulations", :label="$t('pages.saveSimulation.mySimulations')")
    q-tab(name="allSimulations", :label="$t('pages.saveSimulation.allSimulations')")
  q-separator
  q-tab-panels.q-pt-none(
      v-model="tab"
      animated
      swipeable
      transition-prev="jump-up"
      transition-next="jump-up"
  )
      q-tab-panel(name="mySimulations")
        .searchContainer.q-pa-md
          search-bar.search(:label="$t('pages.saveSimulation.searchDesc')", v-model="searchDesc" filled icon="search")
        .scroll.q-px-md
          div.containerScroll(ref="scrollContainerMySimulation")
            q-infinite-scroll.infinite(scroll-target="$refs.scrollContainerMySimulation" @load="loadMoreMySimulations" :offset="250" ref="mySimulationScroll")
              template(v-slot:loading)
                div(class="row justify-center q-my-md")
                  q-spinner-dots(color="primary" size="40px")

              div.q-gutter-y-md
                simulation-item(v-for="(simulation, index) in mySimulations.rows" :key="index" :simulation="simulation" @deleteSimulation="onSimulationDeleted")
      q-tab-panel(name="allSimulations")
        .searchContainer.q-gutter-y-sm.q-pa-md
            search-bar.search(:label="$t('pages.saveSimulation.searchAccount')", v-model="searchAccount" filled icon="person")
            search-bar.search(:label="$t('pages.saveSimulation.searchDesc')", v-model="searchDesc" filled icon="search")
        .scroll.q-px-md
          div.containerScrollAll(ref="scrollContainerAllSimulation")
            q-infinite-scroll.infinite(scroll-target="$refs.scrollContainerAllSimulation" @load="loadMoreAllSimulations" :offset="250" ref="allSimulationScroll")
              template(v-slot:loading)
                div(class="row justify-center q-my-md")
                  q-spinner-dots(color="primary" size="40px")

              div.q-gutter-y-md
                simulation-item(v-for="(simulation, index) in allSimulations.rows" :key="index" :simulation="simulation" @deleteSimulation="onSimulationDeleted")
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import SimulationItem from '~/pages/cycles/list/components/simulation-item'
import SearchBar from '~/components/search-bar'
export default {
  name: 'load-simulation',
  components: { SimulationItem, SearchBar },
  mounted () {
    this.$refs.mySimulationScroll.trigger()
  },
  beforeDestroy () {
    this.cleanAllSimulations()
    this.cleanMySimulations()
  },
  data () {
    return {
      tab: 'mySimulations',
      offsetMySimulations: 0,
      offsetAllSimulations: 0,
      limit: 10,
      searchDesc: undefined,
      searchAccount: undefined
    }
  },
  computed: {
    ...mapState('simulations', ['mySimulations', 'allSimulations'])
  },
  watch: {
    searchDesc () {
      if (this.tab === 'mySimulations') {
        this.resetMySimulationScroll()
      } else if (this.tab === 'allSimulations') {
        this.resetAllSimulationScroll()
      }
    },
    searchAccount () {
      this.resetAllSimulationScroll()
    },
    tab () {
      // this.searchDesc = ''
      // this.searchAccount = ''
    }
  },
  methods: {
    ...mapActions('simulations', ['searchAllSimulations', 'searchMySimulations']),
    ...mapMutations('simulations', ['cleanMySimulations', 'cleanAllSimulations']),
    onSimulationDeleted () {
      this.cleanMySimulations()
      this.cleanAllSimulations()
      if (this.tab === 'mySimulations') {
        this.resetMySimulationScroll()
      } else if (this.tab === 'allSimulations') {
        this.resetAllSimulationScroll()
      }
    },
    resetMySimulationScroll () {
      this.$refs.mySimulationScroll.reset()
      this.cleanMySimulations()
      this.offsetMySimulations = 0
      this.$refs.mySimulationScroll.trigger()
    },
    resetAllSimulationScroll () {
      this.$refs.allSimulationScroll.reset()
      this.cleanAllSimulations()
      this.offsetAllSimulations = 0
      this.$refs.allSimulationScroll.trigger()
    },
    async loadMoreMySimulations (index, done) {
      if (this.mySimulations.more) {
        await this.searchMySimulations({
          term: this.searchDesc,
          offset: this.offsetMySimulations,
          limit: this.limit
        })
        this.offsetMySimulations += this.limit
      }
      done()
    },
    async loadMoreAllSimulations (index, done) {
      if (this.allSimulations.more) {
        await this.searchAllSimulations({
          account: this.searchAccount,
          term: this.searchDesc,
          offset: this.offsetAllSimulations,
          limit: this.limit
        })
        this.offsetAllSimulations += this.limit
      }
      done()
    }
  }
}
</script>

<style lang="sass" scoped>
  #Container
    min-width: 35vw
    width: 30vw
    max-width: 700px
    overflow: 'hidden'
  .containerScroll
    height: 70vh
    overflow: 'hidden' !important
  .containerScrollAll
    height: 65vh
    overflow: 'hidden' !important
    // ::-webkit-scrollbar-thumb
    //   background-color: green !important
  .searchContainer
    overflow: 'hidden' !important
  .infinite
    overflow: 'hidden' !important

  @media (max-width: 700px)
   #Container
    width: 100%
    min-width: 70vw
</style>
