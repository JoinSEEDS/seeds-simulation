<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import LeftMenu from '~/components/layout/left-menu'
import RightMenuAuthenticated from '~/components/layout/right-menu-authenticated'
import RightMenuGuest from '~/components/layout/right-menu-guest'
import RightMenuFormCycles from '~/components/layout/right-menu-form-cycles'

export default {
  name: 'layout-auth',
  components: {
    LeftMenu,
    RightMenuAuthenticated,
    RightMenuGuest,
    RightMenuFormCycles
  },
  data () {
    return {
      menu: false,
      right: false,
      miniState: true,
      showConfirmCleanSimulation: false
    }
  },
  computed: {
    ...mapGetters('accounts', ['isAuthenticated']),
    ...mapState('simulations', ['editingMySimulation']),
    titleBar () {
      return this.editingMySimulation.status ? `${this.$t('pages.saveSimulation.simulation')}: ${this.editingMySimulation.simulation.name}` : ''
    }
  },
  methods: {
    ...mapActions('accounts', ['autoLogin']),
    ...mapActions('simulations', ['cleanSimulationData']),
    async onCleanSimulationData () {
      try {
        this.showConfirmCleanSimulation = false
        this.showIsLoading(true)
        await this.cleanSimulationData()
        await this.sleep(400)
        this.showNotification('Simulation restored')
        this.showIsLoading(false)
      } catch (error) {
        this.showNotification(error, 'error')
      }
    }
  }
}
</script>

<template lang="pug">
  q-layout(view="hHh lpr lff")
    q-header(elevated)
      q-toolbar.bg-accent
        img.logo(src="statics/seeds-logo-with-text.png")
        q-toolbar-title
          .row.items-center(v-if="editingMySimulation.status")
            //- p.q-ma-none {{titleBar}}
            p.q-ma-none {{$t('pages.saveSimulation.simulation')}}:
              strong  {{editingMySimulation.simulation.name}}
            q-icon.cursor-pointer.iconClose(name="cancel" @click="showConfirmCleanSimulation = true")
              q-tooltip {{$t('pages.saveSimulation.cleanSimulation')}}
        right-menu-authenticated(v-if="isAuthenticated")
        right-menu-guest(v-if="!isAuthenticated")
        q-btn(
          flat
          dense
          round
          @click="right = !right"
          icon="fas fa-bars"
          aria-label="Menu"
        )
    //- q-drawer(
    //-   show-if-above
    //-   v-model="menu"
    //-   side="left"
    //-   bordered
    //-   mini-to-overlay
    //-   :mini="miniState"
    //-   @mouseover="miniState = false"
    //-   @mouseout="miniState = true"
    //- )
    //-   left-menu
    q-drawer(
      show-if-above
      v-model="right"
      side="right"
      bordered
    )
      right-menu-form-cycles
    q-page-container
      router-view
    //- Confirm modal to load simulation
    q-dialog(v-model="showConfirmCleanSimulation" persistent v-if="editingMySimulation.status")
      q-card
        q-card-section
          .row.justify-center
            .col-auto
              q-avatar.text-center(icon="restore_from_trash" color="primary" text-color="white")
            .col
              p.text-weight-bold.q-ml-sm.text-center '{{editingMySimulation.simulation.name}}' {{$t('pages.saveSimulation.cleanSimulationMessage')}}
          p.q-ml-sm.text-center {{$t('pages.general.confirmActions')}}

        q-card-actions.float-right
          q-btn(flat :label="$t('common.buttons.cancel')" color="negative" v-close-popup)
          q-btn(flat :label="$t('common.buttons.confirm')" color="primary" @click="onCleanSimulationData")
</template>

<style lang="sass" scoped>
.logo
  max-height: 30px
  max-width: 120px
.badge-left
  left: -5px
  right: auto
.accent
  color: 'red'
  background-color: 'red'
.iconClose
  transition: all 0.3s
  margin-left: 10px
  color: black
.iconClose:hover
  transform: scale(1.5)
  color: $negative
</style>
