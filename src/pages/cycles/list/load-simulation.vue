<template lang="pug">
#Container
    q-tabs(v-model="tab" shrink stretch)
      q-tab(name="mySimulations" label="My Simulations")
      q-tab(name="allSimulations" label="All Simulations")
    q-separator
    q-tab-panels(
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
    )
        q-tab-panel(name="mySimulations")
          div.containerScroll(ref="scrollContainerMySimulation")
            q-infinite-scroll(scroll-target="$refs.scrollContainerMySimulation" @load="onLoad" :offset="250")
              template(v-slot:loading)
                div(class="row justify-center q-my-md")
                  q-spinner-dots(color="primary" size="40px")

              div.q-gutter-y-md
                simulation-item(v-for="(simulation, index) in mySimulations" :key="index" :simulation="simulation")
        q-tab-panel(name="allSimulations")
            div(class="text-h4 q-mb-md") All Mails
            p Lorem ipsum dol
</template>

<script>
import SimulationItem from '~/pages/cycles/list/components/simulation-item'
export default {
  name: 'load-simulation',
  components: { SimulationItem },
  data () {
    return {
      tab: 'mySimulations',
      mySimulations: [
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
      ]
    }
  },
  methods: {
    onLoad (index, done) {
      console.log('OnLoad')
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
    }
  }
}
</script>

<style lang="sass" scoped>
#Container
  width: 50vw
.containerScroll
  height: 80vh
</style>
