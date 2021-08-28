<template>
  <div>
    <!-- Material form register -->
    <form action="#">
      <p class="h4 text-center mb-4 mt-4">Iniciar sesion</p>
      <div class="grey-text">
        <mdb-input label="Email" icon="envelope" type="email" v-model="email" />
        <mdb-input
          label="Password"
          icon="lock"
          type="password"
          v-model="password"
        />
      </div>
      <div class="text-center">
        <mdb-btn color="primary" @click="iniciar()">Entrar</mdb-btn>
      </div>
    </form>

    <mdb-container
      ><mdb-alert color="danger" v-if="error">
{{error}}
      </mdb-alert>
    </mdb-container>

    <!-- Material form register -->
  </div>
</template>

<script>
import firebase from 'firebase'
import "../firebase/init"
import { mdbInput, mdbBtn, mdbContainer, mdbAlert } from "mdbvue";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  name: "Basic",
  components: {
    mdbInput,
    mdbBtn,
    mdbContainer,
    mdbAlert,
  },

  methods: {
    iniciar() {
      if (this.email && this.password) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
              this.$router.push({name: 'dashboard'});
              console.log(user);
          }).catch(err => {
              this.error = err.message
          })
      } else {
        this.error = "Debes llenar todos los campos";
      }
    },
  },
};
</script>

<style>
</style>
