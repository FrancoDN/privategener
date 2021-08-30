<template>
    <div class="w-full">
    <div class="flex justify-center bounce-in-bottom">
      
      <div class="bg-gray-100 w-full px-4 py-2">
      <div class="grid grid-cols-2 w-50 gap-2">
        <div>
          <h4 class="text-blue-400 bold uppercase mt-3">
            Group:  <span class="text-gray-600 md:ml-3"> {{strGroupId}} </span> 
            <button class="bg-yellow-600 text-white font-bold w-15 m-0 px-2 py-1 mt-3 ml-4 rounded-md text-xs" @click="group()">
              <i class="fas fa-edit text-white text-xs"></i>
              Edit
              </button>
            </h4>
          <div v-if="strGroupId !== ''">
          
        </div>
        </div>
        
      </div>

        <ul class="px-6 py-8">
          <li class="text-gray-400">
            PlantId
          </li>
          
          <li class="text-gray-600 border-b-2 mb-6 mt-2 flex space-around" v-for="(plant, index) in arrPlants" :key="index" >
            <span class="w-4/6">
            <i class="fas fa-seedling mr-2 text-green-700"></i>
            {{plant}}
            </span>
            <span class="w-2/6 text-right mb-4" style="font-size: 16px;">
              <span @click="openModalEdit(index)"> 
                <i class="fas fa-edit mr-4 text-yellow-500"></i>
              </span>
            
              <span @click="deletePlant(index)">
                <i class="far fa-trash-alt mr-1 text-red-500"></i>
              </span>

            </span>
          </li>
        </ul>
    </div>
    </div>
    <div class="flex justify-center bounce-in-bottom">
      <div class="w-full" v-if="arrPlants.length < 6" >
        <button class="bg-green-500 text-white font-bold w-full m-0 px-4 py-2" @click="show()">Add Plant</button>
      </div>


    </div>
    


      <modal name="add-plant-modal" :width="300" :height="212">
        <div class="px-6 py-4">
          <h3>Add New Plant</h3>

          <div class="block my-4">
                    <label for="plantIdAdd" class="block text-gray-400 text-sm">Plant ID</label>
                    <input v-model="strPlantId" id="plantIdAdd" type="text" class="w-full h-10 py-2 px-2 border-2 border-gray-300 rounded-md">
          </div>
                
        </div>
        <div class="flex justify-center mt-6">
          <button class="bg-green-500 text-white font-bold w-full m-0 px-4 py-2" @click="AddPlantsInArr()">Add Plant</button>
        </div>
    </modal>


    <modal name="initial-plant-modal" :width="300" :height="288">
        <div class="px-6 py-4">
          <h3>Add New Plant</h3>
          <div class="block my-4">
                    <label for="groupId" class="block text-gray-400 text-sm">Group</label>
                    <input v-model="strGroupId" id="groupId" type="text" class="w-full h-10 py-2 px-2 border-2 border-gray-300 rounded-md">
          </div>
          
          <div class="block my-4">
                    <label for="plantId" class="block text-gray-400 text-sm">Plant ID</label>
                    <input v-model="strPlantId" id="plantId" type="text" class="w-full h-10 py-2 px-2 border-2 border-gray-300 rounded-md">
          </div>
                
        </div>
        <div class="flex justify-center mt-6">
          <button class="bg-green-500 text-white font-bold w-full m-0 px-4 py-2" @click="AddPlantsInArr()">Add plant</button>
        </div>
    </modal>


   <modal name="change-group-modal" :width="300" :height="212">
        <div class="px-6 py-4">
          <h3>Change group</h3>

          <div class="block my-4">
                    <label for="modifyGroupId" class="block text-gray-400 text-sm">Group</label>
                    <input v-model="strGroupId" id="modifyGroupId" type="text" class="w-full h-10 py-2 px-2 border-2 border-gray-300 rounded-md">
          </div>
                
        </div>
        <div class="flex justify-center mt-6">
          <button class="bg-green-500 text-white font-bold w-full m-0 px-4 py-2" @click="modifyGroup()">Modify group</button>
        </div>
    </modal>


  </div>
</template>

<script>
import plantServices from '../services/plant.services.js'
export default {
  name: 'Account',
  components: {
  },
  props: ['account'],
  
  data() {
    return {
      strPlantId: '',
      strGroupId: '',
      arrPlants: [],
      isLoading: true,
      localStorageUser: '',
      numAccount: 0,
      accountSelected: null,
    }
  },
  
  async mounted() {
    this.localStorageUser = localStorage.getItem('user');
    this.numAccount = this.account.account;
    this.strGroupId = (this.account.grupo) && this.account.grupo;
    this.arrPlants = (this.account.plantid.length > 0) ? this.account.plantid: [];

  },

  methods: {
        async AddPlantsInArr() {

          if(this.strPlantId) {
            this.arrPlants.push(this.strPlantId);
            this.strPlantId = '';
            
            try {
              const saveBD = await this.addPlantInBD(this.arrPlants);
              this.closeAllModals();
            } catch (error) {
              this.closeAllModals();
              this.printErrors();
            }

          }
        },
        async addPlantInBD(arrPlants) {
          
          let plant = {
            plantid: Object.values(arrPlants),
            grupo: this.strGroupId,
            uid: this.localStorageUser,
            account: this.accountSelected
          };

          console.log(plant)

        //   try {
        //     const update = await plantServices.updateAccounts(plant);
        //     this.printSuccess()
        //     return update;
        //   } catch (error) {
        //     this.printErrors();
        //   }
        },

        openModalEdit(index) {
          this.strPlantId = this.arrPlants[index];
          this.arrPlants.splice(index,1);
          this.$modal.show('add-plant-modal');
        },

        async deletePlant(index) {
          this.arrPlants.splice(index,1);
          
          let updatedPlant = {
            plantid: Object.values(this.arrPlants),
            grupo: this.strGroupId,
            uid: this.localStorageUser,
            account: 1
          };

          try {
            const update = await plantServices.updateAccounts(updatedPlant);
            this.printSuccess();
            return update; 
          } catch (error) {
            this.printErrors();
          }
        },


        async modifyGroup() {
          let updateGroup = {
            plantid: Object.values(this.arrPlants),
            grupo: this.strGroupId,
            uid: this.localStorageUser,
            account: 1
          };

          try {
            const update = await plantServices.updateAccounts(updateGroup);
            this.closeAllModals();
            this.printSuccess();
            return update; 
          } catch (error) {
            this.closeAllModals();
            this.printErrors();
          }
        },

        
        
        addAccount() {
          
        },

        search() {},

        // Aux
        show() {
          this.strPlantId = '';
          (this.arrPlants.length > 0) ? this.$modal.show('add-plant-modal') : this.$modal.show('initial-plant-modal');
          this.accountSelected = this.account.account;
          console.log(this.account.account)
            return this.account.account
        },

        group() {
        this.$modal.show('change-group-modal');

        },

        hide() {
            this.$modal.hide('add-plant-modal');
            this.strPlantId = '';
        },

        closeAllModals() {
          this.$modal.hide('add-plant-modal');
          this.$modal.hide('initial-plant-modal');
          this.$modal.hide('change-group-modal');
        },

        printErrors() {
          this.$toast.open({
            message: 'Ups! Something went wrong.',
            type: 'error',
          });
        },

        printSuccess() {
          this.$toast.open({
            message: 'Perfect !',
            type: 'success',
          });
        },

        
  },
}
</script>

<style>

</style>