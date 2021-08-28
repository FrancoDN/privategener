<template>
  <div>
    <!-- Material form register -->
    <form>
      <p class="h4 text-center mb-4 mt-4">Registro</p>
      <div class="grey-text">
        <mdb-input
          label="Discord ID"
          icon="user"
          type="text"
          v-model="discordId"
        />
        <mdb-input label="Email" icon="envelope" type="email" v-model="email" />
        <mdb-input
          label="Password"
          icon="lock"
          type="password"
          v-model="password"
        />
      </div>
      <div class="text-center">
        <mdb-btn color="primary" @click="registro()">Register</mdb-btn>
      </div>
    </form>
    <mdb-container
      ><mdb-alert color="danger" v-if="error">
        {{ error }}
      </mdb-alert>
    </mdb-container>
    <!-- Material form register -->
  </div>
</template>

<script>
import donorsServices from "../services/donorsServices.js";
import firebase from "firebase";
import "../firebase/init";
import { mdbInput, mdbBtn, mdbContainer, mdbAlert } from "mdbvue";
export default {
  data() {
    return {
      email: "",
      password: "",
      discordId: "",
      error: "",
      user: "",
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
    registro() {
      this.error = "";
      if (this.email && this.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            this.email = "";
            this.password = "";
            console.log(user);
            let donor = {
              discord: this.discordId,
              uid: firebase.auth().currentUser.uid,
              active: true,
            };
            donorsServices.postDonor(donor);
            this.$router.push({name: 'dashboard'});

          })
          .catch((err) => {
            this.error = err.message;
          });
      } else {
        this.error = "Debes llenar todos los campos";
      }
    },
  },
};
</script>

<style>
</style>
