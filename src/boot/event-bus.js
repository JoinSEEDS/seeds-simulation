import Vue from 'vue'
export default ({ store }) => {
  store['$EventBus'] = new Vue()
}
