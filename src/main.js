import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// http://andreybleme.com/2018-01-07/sharing-data-across-vuejs-components/
export const serverBus = new Vue();

new Vue({
  render: h => h(App)
}).$mount('#app')
