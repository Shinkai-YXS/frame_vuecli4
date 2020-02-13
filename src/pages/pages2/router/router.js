import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Box from "@/pages/pages2/pages2.vue";
export default new Router({
  routes: [{
    path: '/',
    name: 'app',
    component: Box,
    children: [
      // 测试页面
      {
        path: 'test',
        meta: {title: '测试测试'},
        component: () => import('@/pages/pages2/views/test/test.vue')
      }
    ]
  }]
})
