<template lang="pug">
#main.q-my-md
  #container-group
    #name-group
      .title-group
        img.seeds-icon(v-if="icon" src="~/assets/seeds-green-small.png")
        span.p.text-title {{title}}
    .q-pa-md
        slot
         p Here put your component
</template>

<script>
export default {
  name: 'group-container',
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    icon: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="sass" scoped>
#container-group
  border: solid 1px
  border-radius: 5px
#name-group
  position: relative
  margin-top: -28px
  margin-left: 8px
  padding: none
  margin-bottom: 0px
  background-color: 'red'
.title-group
  display: inline-block
  background: white
  padding: 5px 5px 2px 5px
  font-size: 15px
  margin-bottom: px
  border-radius: 5px
.seeds-icon
  height: 30px
  margin-bottom: -7px
  margin-right: 3px
.text-title
  height: 24.4px
  width: 126.7px
  color: #091935
  font-family: "Helvetica Neue"
  font-size: 18px
  letter-spacing: 0.75px
  line-height: 21px
</style>
