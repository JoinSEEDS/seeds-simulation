import Vue from 'vue'
import Vuex from 'vuex'

import accounts from './accounts'
import transfers from './transfers'
import general from './general'
import harvest from './harvest'
import simulations from './simulations'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      accounts,
      transfers,
      general,
      harvest,
      simulations
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
