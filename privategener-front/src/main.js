import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueEditortable from "vue-editortable"
Vue.component('vue-editortable', VueEditortable)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

let app = null;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
   app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})

