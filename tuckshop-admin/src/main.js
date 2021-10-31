import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Axios from 'axios'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')


Vue.prototype.$axios = Axios;

Vue.prototype.$routeApi = "http://localhost:8000/"


if (localStorage.getItem('admin')) 
Vue.prototype.$auth= JSON.parse(localStorage.getItem('admin'));