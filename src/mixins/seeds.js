import { mapActions } from 'vuex'

export const seeds = {
  data () {
    return {
    }
  },
  methods: {
    // Import actions from the store (Vuex)
    ...mapActions('harvest', ['getDataTable'])
  },
  computed: {
    myDataTable1 () {
      return this.$store.state.harvest.dataTable1
    }
  }
}
