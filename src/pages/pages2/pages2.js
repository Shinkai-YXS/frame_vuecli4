import Vue from 'vue'
import App from './pages2.vue'
import router from './router/router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
