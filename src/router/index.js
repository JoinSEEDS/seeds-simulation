import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import Croppa from 'vue-croppa'

Vue.use(Croppa)
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to, from, next) => {
    // Verify the screens is for users guest
    if (to.matched.some(record => !record.meta.guest)) {
      // Verify if the user is authenticated
      if (store.getters['accounts/isAuthenticated'] || store.getters['accounts/isGuest']) {
        // Verify the communication method
        // if (to.matched.some(record => record.meta.needVerifyComm)) {
        //   const isRegistered = store.getters['profiles/isRegistered']
        //   if (!isRegistered) {
        //     next({ name: 'userRegister' })
        //   } else if (store.getters['profiles/needVerifyComm']) {
        //     next({ name: 'verifyComm', query: { returnUrl: to.path } })
        //   } else next()
        // } else next()
        next()
      } else {
        next({ path: `/login?returnUrl=${to.path}` })
      }
    } else {
      next()
    }
  })

  return Router
}
