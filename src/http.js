import axios from 'axios'
import router from './router/index'

//axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = ''; //基本的访问地址

// 从localStorage中获取token值
// const token = localStorage.getItem('')

//http request 拦截器
axios.interceptors.request.use(
  config=>{
    if(config.method === 'put'){
      let qs = require('qs')
      config.data = qs.stringify(config.data)
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if(token){
      config.header.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err=>{
    return Promise.reject(err);
  }
);

//http response 连接器
axios,interceptors.response.use({
  response =>{
    return response;
  },
  error =>{
    if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'Home',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
          return Promise.reject(error.response.status)
});
