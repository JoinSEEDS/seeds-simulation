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
      miniState: true
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
    ...mapActions('accounts', ['autoLogin'])
  }
}
</script>

<template lang="pug">
  q-layout(view="hHh lpr lff")
    q-header(elevated)
      q-toolbar.bg-accent
        //- q-btn(
        //-   flat
        //-   dense
        //-   round
        //-   @click="menu = !menu"
        //-   icon="fas fa-bars"
        //-   aria-label="Menu"
        //- )
        img.logo(src="statics/seeds-logo-with-text.png")
        q-toolbar-title
          .row.items-center(v-if="editingMySimulation.status")
            //- p.q-ma-none {{titleBar}}
            p.q-ma-none {{$t('pages.saveSimulation.simulation')}}:
              strong  {{editingMySimulation.simulation.name}}
            q-icon.cursor-pointer.iconClose(name="cancel")
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
    q-drawer(
      show-if-above
      v-model="menu"
      side="left"
      bordered
      mini-to-overlay
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    )
      left-menu
    q-drawer(
      show-if-above
      v-model="right"
      side="right"
      bordered
    )
      right-menu-form-cycles
    q-page-container
      router-view
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
