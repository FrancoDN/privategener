<template>
  <div>
  <mdb-navbar color="indigo" dark>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-dropdown tag="li" class="nav-item" v-if="user">
          <mdb-dropdown-toggle tag="a" navLink color="indigo" slot="toggle" waves-fixed>{{user.email}}</mdb-dropdown-toggle>
          <mdb-dropdown-menu class="mr-4">
            <mdb-dropdown-item> <router-link to="/dashboard"> Cuenta 1 </router-link></mdb-dropdown-item>
            <mdb-dropdown-item v-if="license"> <router-link to="/dashboard2"> Cuenta 2 </router-link></mdb-dropdown-item>
            <mdb-dropdown-item @click="logout()">Cerrar sesion</mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
        <div class="row" v-else>
        <mdb-nav-item href="#" active><router-link to="/login">Iniciar Sesion</router-link></mdb-nav-item>
        <mdb-nav-item href="#"><router-link to="/registro">Registrarse</router-link></mdb-nav-item>
        </div>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
     
  </mdb-navbar>
  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
  import { mdbNavbar, mdbNavbarToggler, mdbNavbarNav, mdbNavItem,mdbDropdown, mdbDropdownMenu, mdbDropdownToggle, mdbDropdownItem  } from 'mdbvue';
  export default {
    data(){
      return {
        user: null,
        license: false,
      }
    },
    name: 'NavbarPage',
    components: {
      mdbNavbar,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem,
      mdbDropdown,
      mdbDropdownMenu,
      mdbDropdownToggle,
      mdbDropdownItem

    },
    methods: {
      logout() {
        firebase.auth().signOut().then(() => {this.$router.push({name: 'login'})})
      }, 
    },
    mounted() {
      axios.get(`http://localhost:3000/donor/${firebase.auth().currentUser.uid}`).then((result) => {
        this.license = result.data.license
      });
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
          console.log(user);
          user ? this.user = user : this.user = null
        })
      }
  }
</script>

<style>
</style>
