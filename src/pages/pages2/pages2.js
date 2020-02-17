import Vue from 'vue'
import App from './pages2.vue'
import router from './router/router'
// 引入 UI
import vant from 'vant'
import 'vant/lib/index.css'
Vue.use(vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
