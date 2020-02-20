<script>
import { mapGetters } from 'vuex'
import addCycleForm from '~/pages/cycles/add/add-cycle-form'

export default {
  name: 'right-menu-form-cycles',
  components: { addCycleForm },
  computed: {
    ...mapGetters('accounts', ['isAuthenticated'])
  }
}
</script>

<template lang="pug">
  q-scroll-area.fit
    add-cycle-form
</template>

<style lang="stylus">

</style>
