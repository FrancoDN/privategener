import Vue from 'vue'
import VueRouter from 'vue-router'
import Registro from '../views/Registro.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Dashboard2 from '../views/Dashboard2.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registro',
    name: 'registro',
    component: Registro
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard2',
    name: 'dashboard2',
    component: Dashboard2,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(ruta => ruta.meta.requiresAuth)) {
    const user = firebase.auth().currentUser;
    if(user) {
      next();
    } else {
      next({name: 'login'})
    }
  } else {
    next();
  }
})


export default router
