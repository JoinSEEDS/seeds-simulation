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
  q-tab-panels(
      v-model="tab"
      animated
      swipeable
      transition-prev="jump-up"
      transition-next="jump-up"
  )
      q-tab-panel(name="mySimulations")
        div.containerScroll(ref="scrollContainerMySimulation")
          q-infinite-scroll(scroll-target="$refs.scrollContainerMySimulation" @load="loadMoreMySimulations" :offset="250" ref="mySimulationScroll")
            template(v-slot:loading)
              div(class="row justify-center q-my-md")
                q-spinner-dots(color="primary" size="40px")

            div.q-gutter-y-md
              simulation-item(v-for="(simulation, index) in mySimulations.rows" :key="index" :simulation="simulation")
      q-tab-panel(name="allSimulations")
        div.containerScroll(ref="scrollContainerAllSimulation")
          q-infinite-scroll(scroll-target="$refs.scrollContainerAllSimulation" @load="loadMoreAllSimulations" :offset="250" ref="allSimulationScroll")
            template(v-slot:loading)
              div(class="row justify-center q-my-md")
                q-spinner-dots(color="primary" size="40px")

            div.q-gutter-y-md
              simulation-item(v-for="(simulation, index) in allSimulations.rows" :key="index" :simulation="simulation")
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import SimulationItem from '~/pages/cycles/list/components/simulation-item'
export default {
  name: 'load-simulation',
  components: { SimulationItem },
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
      limit: 10
    }
  },
  computed: {
    ...mapState('simulations', ['mySimulations', 'allSimulations'])
  },
  methods: {
    ...mapActions('simulations', ['searchAllSimulations', 'searchMySimulations']),
    ...mapMutations('simulations', ['cleanMySimulations', 'cleanAllSimulations']),
    async loadMoreMySimulations (index, done) {
      if (this.mySimulations.more) {
        await this.searchMySimulations({
          term: '',
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
          term: '',
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
  height: 74vh
@media (max-width: 700px)
 #Container
  width: 100%
  min-width: 70vw
</style>
