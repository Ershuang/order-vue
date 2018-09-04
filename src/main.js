// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import{post,fetch,patch,put} from 'http'
//封装好的axios在这里引入
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$parch = patch;
Vue.prototype.$put = put;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  data: {
    eventHub: new Vue()
  },
  template: '<App/>'
})
