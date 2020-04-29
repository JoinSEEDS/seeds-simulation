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
import { validation } from '~/mixins/validation'
export default {
  name: 'save-simulation-form',
  mixins: [ validation ],
  data () {
    return {
      form: {
        name: '',
        description: ''
      },
      data: {}
    }
  },
  methods: {
    onCancel () {
      this.$emit('cancel')
    },
    onSave () {
    }
  }
}
</script>

<style lang="sass" scoped>
  #Container
</style>
