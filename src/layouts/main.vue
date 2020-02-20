<script>
import { mapActions, mapGetters } from 'vuex'
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
    ...mapGetters('accounts', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('accounts', ['autoLogin'])
  }
}
</script>

<template lang="pug">
  q-layout(view="hHh lpr lff")
    q-header(elevated)
      q-toolbar
        //- q-btn(
        //-   flat
        //-   dense
        //-   round
        //-   @click="menu = !menu"
        //-   icon="fas fa-bars"
        //-   aria-label="Menu"
        //- )
        q-toolbar-title.flex.items-center
          img.logo(src="statics/telos-logo-white.svg")
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
  max-width: 100px
.badge-left
  left: -5px
  right: auto
</style>
