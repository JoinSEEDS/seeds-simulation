import { mapActions } from 'vuex'

export const seeds = {
  data () {
    return {
    }
  },
  methods: {
    // Import actions from the store (Vuex)
    ...mapActions('harvest', ['getDataTable']),
    ...mapActions('harvest', ['getDataChart']),
    ...mapActions('harvest', ['doCycle']),
    ...mapActions('harvest', ['editSimulationState']),
    ...mapActions('harvest', ['setCycleTables'])
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
