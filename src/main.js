import '@fortawesome/fontawesome-free/js/all.js';
import Vue from 'vue'
import App from './App.vue'
import './config/bootstrap'
import store from './config/store'
import router from './config/router'
import './config/msgs'
import './config/axios'
import './config/mq'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
