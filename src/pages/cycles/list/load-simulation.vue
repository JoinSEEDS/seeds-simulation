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
              simulation-item(v-for="(simulation, index) in mySimulations" :key="index" :simulation="simulation")
      q-tab-panel(name="allSimulations")
        div.containerScroll(ref="scrollContainerAllSimulation")
          q-infinite-scroll(scroll-target="$refs.scrollContainerAllSimulation" @load="loadMoreAllSimulations" :offset="250" ref="allSimulationScroll")
            template(v-slot:loading)
              div(class="row justify-center q-my-md")
                q-spinner-dots(color="primary" size="40px")

            div.q-gutter-y-md
              simulation-item(v-for="(simulation, index) in allSimulations" :key="index" :simulation="simulation")
</template>

<script>
import { mapActions } from 'vuex'
import SimulationItem from '~/pages/cycles/list/components/simulation-item'
export default {
  name: 'load-simulation',
  components: { SimulationItem },
  async mounted () {
    this.$refs.mySimulationScroll.trigger()
    const simulations = await this.searchSimulations({
      account: undefined,
      term: '',
      offset: 0,
      limit: 100
    })
    console.log('load-simulation', simulations)
  },
  data () {
    return {
      tab: 'mySimulations',
      mySimulations: [],
      allSimulations: []
    }
  },
  methods: {
    ...mapActions('simulations', ['searchSimulations']),
    loadMoreMySimulations (index, done) {
      setTimeout(() => {
        this.mySimulations.push(
          {
            name: 'Simulation of Test',
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          },
          {
            name: 'Simulation of Test',
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          },
          {
            name: 'Simulation of Test',
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          },
          {
            name: 'Simulation of Test',
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
        )
        done()
      }, 2000)
    },
    loadMoreAllSimulations (index, done) {
      setTimeout(() => {
        this.allSimulations.push(
          {
            name: 'Simulation of Test',
            user: 'jmgayosso',
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          },
          {
            name: 'Simulation of Test',
            user: 'xhema',
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          },
          {
            name: 'Simulation of Test',
            user: 'jmgayosso',
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          },
          {
            name: 'Simulation of Test',
            user: 'jmgayosso',
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
        )
        done()
      }, 2000)
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
