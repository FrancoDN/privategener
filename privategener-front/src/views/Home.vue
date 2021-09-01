<template>
  <div class="" v-if="!isLoading">
    
    
    <NavBar :cantAccount="cantAccounts" :numAccountMax="cantLicenses" @plusAccount='addAccount' />
    
    <div class="flex justify-center bounce-in-bottom grid lg:grid-cols-4 md:grid-cols-3 md:grid-cols-2">
      <div v-for="(account, index) in arrAccounts" :key="index" class="mx-2 my-4">
        <Account :account="account" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Account from '@/components/Account.vue'
import donorServices from '../services/donor.services.js'
import {AtomSpinner} from 'epic-spinners'

export default {
  name: 'Home',
  components: {
    NavBar,
    Account,
    AtomSpinner
  },
  props: ['account'],

  data() {
    return {
      strPlantId: '',
      strGroupId: '',
      arrAccounts: [],
      arrPlants: [],
      cantAccounts: 0,
      cantLicenses: 1,
      isLoading: true,
      initData: {
        grupo: null,
        plantid: [],
        account: 0
      }
    }
  },
  
  async mounted() {
    this.isLoading = true;
    this.arrAccounts = await this.getAccounts();
    this.cantAccounts = this.arrAccounts.length;
    this.cantLicenses = await this.getLicense();
    this.isLoading = false;
    
  },

  methods: {

        async getAccounts() {
          this.isLoading = true;
          try {
            this.localStorageUser = localStorage.getItem('user');
            const plantsById = await donorServices.getAccountsByUserId(this.localStorageUser);
            return plantsById.data;
          } catch (error) {
            console.log(error);
          }
        },

        async getLicense() {
          this.isLoading = true;
          try {
            const license = await donorServices.getDonorLicense(this.localStorageUser);
            this.localStorageLicense = localStorage.setItem('license', license.data)
            return license.data;
          } catch (error) {
            console.log(error);
          }
        },

        addAccount(data) {
          console.log('Largo cuentas', this.arrAccounts.length);
          console.log('Cantidad licensias', this.cantLicenses);

          if(this.arrAccounts.length < this.cantLicenses) {
          this.initData.account = this.arrAccounts.length + 1
          this.arrAccounts.push(this.initData)
          } else {
            this.printErrors();
            this.initData.account = null
          }
        },
        
        printErrors() {
          this.$toast.open({
            message: "Oops! you can't create more accounts",
            type: 'error',
          });
        },
  },
}
</script>
<style scoped>
  .bounce-in-bottom {
	  -webkit-animation: bounce-in-bottom 1.1s both;
	  animation: bounce-in-bottom 1.1s both;
  }

/**
 * ----------------------------------------
 * animation bounce-in-bottom
 * ----------------------------------------
 */
@-webkit-keyframes bounce-in-bottom {
  0% {
    -webkit-transform: translateY(500px);
            transform: translateY(500px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateY(65px);
            transform: translateY(65px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateY(28px);
            transform: translateY(28px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateY(8px);
            transform: translateY(8px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}
@keyframes bounce-in-bottom {
  0% {
    -webkit-transform: translateY(500px);
            transform: translateY(500px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateY(65px);
            transform: translateY(65px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateY(28px);
            transform: translateY(28px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateY(8px);
            transform: translateY(8px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}

</style>
