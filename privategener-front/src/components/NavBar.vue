<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 mb-3">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
        <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
          <img src="../assets/pvu.png" alt="" class="h-8 w-20" >
        </a>
        <button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item">
            <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
              <i class="fas fa-user-plus text-lg leading-lg text-white opacity-75"/><span class="ml-2" @click="addAccount()">Add Account</span>
            </a>
          </li>
          
          <li class="nav-item">
            <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
              <i class="fab fa-discord text-lg leading-lg text-white opacity-75"/><span class="ml-2"><a href="https://discord.gg/kBh5GHY6">Discord</a></span>
            </a>
          </li>

          <li class="nav-item" @click="logOut()">
              <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                <i class="fab fa-sign-out text-lg leading-lg text-white opacity-75" /><span class="ml-2">LogOut</span>
              </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'NavBar',
    props: ['cantAccount','numAccountMax'],
    data() {
        return {
            showMenu: false,
            addAccountValue: false,
        }
    },
    mounted() {
      },

    methods: {
        toggleNavbar(){
            this.showMenu = !this.showMenu;
        },

        addAccount() {
          this.addAccountValue = true;
          this.$emit('plusAccount', this.addAccountValue)
        },

        logOut() {
          localStorage.clear();
          firebase.auth().signOut();
          this.$router.push('/login');
        }
    }
}
</script>
