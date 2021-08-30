import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
//import firebaseApp from 'firebase'
import firebase from 'firebase/app';
import firebaseAuth from 'firebase'
//import firebase from 'firebase/app';


import vmodal from 'vue-js-modal'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);
Vue.use(vmodal)
Vue.config.productionTip = false

let app =null;
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
const config ={
  apiKey: "AIzaSyD8udq43MiCxJ4uCtHWIe2LxHVWTHzR6sc",
  authDomain: "privategener.firebaseapp.com",
  projectId: "privategener",
  storageBucket: "privategener.appspot.com",
  messagingSenderId: "963601078649",
  appId: "1:963601078649:web:ee8807d2d9310f95f077a8"
}

firebase.initializeApp(config);

firebaseAuth.auth().onAuthStateChanged(() => {
  if(!app) {
   app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
