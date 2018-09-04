import Vue from 'vue'
import Router from 'vue-router'

const home = resolve => require(['@/page/home.vue'],resolve)

// router.beformEach((to,from,next)=>{
//   let token = window.localStorage.getItem('token');
//   if(to.meta.requiresAuth){
//     store.dispatch('getUser')
//     next()
//   }elseP
//   store.dispatch('logOut')
//   next({
//     path:'/login',
//     query:{redirect,to.fullPath}
//   })
// })
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
