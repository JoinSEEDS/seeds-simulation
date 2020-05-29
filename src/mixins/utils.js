import { mapMutations } from 'vuex'
import Vue from 'vue'
import TimeUtil from '~/utils/TimeUtil'

export const EventBus = new Vue()
export const utils = {
  methods: {
    ...mapMutations('general', ['setErrorMsg', 'setSuccessMsg', 'setIsLoading']),
    copyToClipboard (str) {
      const el = document.createElement('textarea')
      el.value = str
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
      }
    },
    showNotification (message, type = 'success') {
      const color = type.toLowerCase() === 'success' ? 'green' : 'red'
      const icon = type.toLowerCase() === 'success' ? 'done' : 'error'
      this.$q.notify({
        color: color,
        textColor: 'white',
        message: message,
        icon: icon,
        timeout: 5000,
        actions: [{ label: 'Close', color: 'white' }]
      })
    },
    showSuccessMsg (message) {
      this.setSuccessMsg(message)
    },
    showErrorMsg (message) {
      this.setErrorMsg(message)
    },
    showIsLoading (state) {
      this.setIsLoading(state)
    },
    formatToMoney (price) {
      const priceRound = Math.round(price)
      let format = new Intl.NumberFormat().format(priceRound)
      return format
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  },
  filters: {
    formatDate (date) {
      return TimeUtil.getFormatDate(new Date(date))
    },
    formatToMoney (amount) {
      // const amount = absolute ? Math.abs(this.amount) : this.amount
      const priceRound = Math.round(amount)
      let format = new Intl.NumberFormat().format(priceRound)
      return `${format}`
    },
    formatNumber (amount) {
      const p = parseFloat(amount).toFixed(2)
      // const amount = absolute ? Math.abs(this.amount) : this.amount
      // const priceRound = Math.round(amount)
      let format = new Intl.NumberFormat().format(p)
      return `${format}`
    }
  }
}
