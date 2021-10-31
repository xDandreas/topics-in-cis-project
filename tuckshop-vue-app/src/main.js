import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Axios from 'axios'
import VueSession from "vue-session";
Vue.config.productionTip = false


Vue.use(VueSession);
Vue.prototype.$axios = Axios;

Vue.prototype.$routeApi = "http://localhost:8000/"


if (localStorage.getItem('user')) 
Vue.prototype.$user= JSON.parse(localStorage.getItem('user'));


Vue.prototype.$loggedIn = false;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
