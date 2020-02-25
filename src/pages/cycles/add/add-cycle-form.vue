<template lang="pug">
    .template-form
        q-form.q-ma-md.q-gutter-y-md
            q-input(filled
                v-model="circulating_seeds"
                label="circulating_seeds"
                hint="circulating_seeds"
                lazy-rules
                type="number"
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="volume_growth"
                label="volume_growth"
                hint="volume_growth"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="seeds_destroyed"
                label="seeds_destroyed"
                hint="seeds_destroyed"
                lazy-rules
                type="number"
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                type="number"
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                type="number"
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-input(filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']")
            q-btn.full-width(
                color="primary"
                label="Send"
                size="lg"
                unelevated
            )

</template>

<script>
export default {
  name: 'add-cycle-form',
  data () {
    return {
      name: '',
      circulating_seeds: '',
      volume_growth: '',
      seeds_destroyed: ''
    }
  }
}
</script>

<style lang="sass" scoped>
.cycle-form

</style>
cycle-form
