import { mapActions } from 'vuex'

export const seeds = {
  data () {
    return {
    }
  },
  methods: {
    // Import actions from the store (Vuex)
    ...mapActions('harvest', ['getDataTable', 'getDataChart'])
  },
  computed: {
    myDataTable1 () {
      return this.$store.state.harvest.dataTable1
    },
    myDataChart () {
      return this.$store.state.harvest.dataChart1
    }
  }
}
