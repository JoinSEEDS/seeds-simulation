<script>
import { mapActions, mapGetters } from 'vuex'
import RequestAccount from './components/request-account'

export default {
  name: 'page-login',
  components: {
    RequestAccount
  },
  data () {
    return {
      idx: null
    }
  },
  computed: {
    ...mapGetters('accounts', ['loading'])
  },
  methods: {
    ...mapActions('accounts', ['login', 'autoLogin']),
    async onLogin (idx) {
      this.idx = idx
      await this.login({ idx: this.idx, returnUrl: '/dashboard' })
    },
    async onLoginAsGuest () {
      console.log('onLoginAsGuest')
      await this.login({ returnUrl: '/dashboard' })
    },
    async onAccountEntered (account) {
      await this.login({ idx: this.idx, account, returnUrl: this.$route.query.returnUrl })
    },
    openUrl (url) {
      window.open(url)
    }
  },
  async mounted () {
    await this.autoLogin(this.$route.query.returnUrl)
  }
}
</script>

<template lang="pug">
  div
    q-list.full-width
      q-item(
        v-for="(wallet, idx) in $ual.authenticators"
        :key="wallet.getStyle().text"
        v-ripple
        :style="{ background: wallet.getStyle().background, color: wallet.getStyle().textColor }"
        v-if="wallet.shouldRender()"
      )
        q-item-section.cursor-pointer(
          avatar
          @click="onLogin(idx)"
        )
          img(
            :src="wallet.getStyle().icon"
            width="30"
          )
        q-item-section.cursor-pointer(@click="onLogin(idx)") {{ wallet.getStyle().text }}
        q-item-section(avatar)
          .flex
            q-spinner(
              v-if="loading === wallet.getStyle().text"
              :color="wallet.getStyle().textColor"
              size="2em"
            )
            q-btn(
              v-else
              :color="wallet.getStyle().textColor"
              icon="fas fa-download"
              @click="openUrl(wallet.getOnboardingLink())"
              target="_blank"
              dense
              flat
              size="12px"
            )
              q-tooltip {{ $t('pages.login.getApp') }}
      -// Login as guest
      q-item.q-mt-xl.item-guest(
        v-ripple
        @click="onLoginAsGuest"
        key="guest"
        clickable
      )
        q-item-section.cursor-pointer(avatar)
          q-icon(color="white" name="account_circle" size="md")
        q-item-section.cursor-pointer(size="2em" color="white")
          p.label {{ $t('pages.login.guest') }}

    request-account(
      @accountEntered="onAccountEntered"
    )

</template>

<style lang="sass" scoped>
.label
  color: white
  margin: 0px
.item-guest
  background-color: #ff5722
  border-radius: 2px
</style>
