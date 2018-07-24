import Vue from 'vue'
import Router from 'vue-router'

const home = resolve => require(['@/page/home.vue'],resolve)


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }

  ]
})
