<script>
import { mapGetters } from 'vuex'

export default {
  name: 'left-menu-authenticated',
  computed: {
    ...mapGetters('accounts', ['isAuthenticated'])
  }
}
</script>

<template lang="pug">
  q-scroll-area.fit
    q-list
      q-item(
        v-if="isAuthenticated"
        to="/dashboard"
        clickable
        v-ripple
      )
        q-item-section(avatar)
          q-icon(name="dashboard")
        q-item-section {{ $t('menu.simulation') }}
</template>

<style lang="stylus">

</style>
