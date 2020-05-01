<template lang="pug">
  #Container.q-pa-md
    //- .text-h4 {{$t('pages.saveSimulation.saveSimulation')}}
    q-form.q-gutter-sm.q-pa-md(
      ref='saveCycleForm'
      @submit="onSave"
    )
        q-input(
            v-model="form.name"
            :label="$t('pages.general.name')"
            filled
            :rules="[rules.required]"
        )
        q-input(
            v-model="form.description"
            :label="$t('pages.general.description')"
            filled
            type="textarea"
            :rules="[rules.required]"
        )
        #buttons.q-gutter-sm.q-pb-lg
            q-btn.float-right(
                :label="$t('common.buttons.save')"
                color="primary"
                type="submit"
            )
            q-btn.float-right(
                :label="$t('common.buttons.cancel')"
                color="red-5"
                @click="onCancel"
                type="button"
            )
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { validation } from '~/mixins/validation'
export default {
  name: 'save-simulation-form',
  mixins: [ validation ],
  data () {
    return {
      form: {
        name: '',
        description: '',
        id: undefined
      }
    }
  },
  mounted () {
    this.syncForm()
  },
  computed: {
    ...mapState('accounts', ['account']),
    ...mapState('harvest', ['simulationState']),
    ...mapState('simulations', ['editingMySimulation'])
  },
  methods: {
    ...mapActions('simulations', ['saveSimulation']),
    syncForm () {
      if (this.editingMySimulation.status) {
        this.form.name = this.editingMySimulation.simulation.name
        this.form.description = this.editingMySimulation.simulation.description
        this.form.id = this.editingMySimulation.simulation.id
      }
    },
    onCancel () {
      this.$emit('cancel')
    },
    async onSave () {
      try {
        await this.saveSimulation({
          id: this.form.id,
          account: this.account,
          name: this.form.name,
          description: this.form.description,
          data: this.simulationState
        })
        // console.log('onSave', response)
        this.$emit('success')
      } catch (error) {
        console.error('onSaveSimulation')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  #Container
</style>
