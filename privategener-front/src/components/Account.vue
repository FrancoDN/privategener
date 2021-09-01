<template>
    <div class="w-full">
    <div class="flex justify-center bounce-in-bottom">
      
      <div class="bg-gray-100 w-full px-4 py-2">
      <div class="grid grid-cols-2 w-50 gap-2">
        <div>
          <h4 class="text-blue-400 bold uppercase mt-3">
            Group:  <span class="text-gray-600 md:ml-3"> {{strGroupId}} </span> 
            <button v-if="!isEditGroup" class="bg-yellow-600 text-white font-bold w-15 m-0 px-2 py-1 mt-3 ml-4 rounded-md text-xs" @click="showFormEditGroup()">
              <i class="fas fa-edit text-white text-xs"></i>
              Edit
              </button>
            </h4>
          <div v-if="strGroupId !== ''">
          
        </div>
        </div>

        <div class="bg-gray-100 text-center mt-0" v-if="isEditGroup">
        <h4>Edit Group</h4>
        <div class="block mb-2">
              <input v-model="strGroupId" id="plantIdAdd" type="text" class="w-full h-8 py-2 px-2 border-2 border-gray-300 rounded-md text-sm">
          </div>
        <div class="w-full">
          <button class="bg-yellow-600 text-white font-bold w-full m-0 px-2 py-1" @click="modifyGroup()">Save</button>
        </div>
  
      </div>

        
      </div>

        <ul class="px-6 pt-8 pb-4">
          <li class="text-gray-400">
            PlantId
          </li>
          
          <li class="text-gray-600 border-b-2 mb-6 mt-2 flex space-around" v-for="(plant, index) in arrPlants" :key="index" >
            <span class="w-4/6">
            <i class="fas fa-seedling mr-2 text-green-700"></i>
            {{plant}}
            </span>
            <span class="w-2/6 text-right mb-4" style="font-size: 16px;" v-if="!isEditGroup && !isEditPlant">
              <span @click="showFormEditPlant(index)"> 
                <i class="fas fa-edit mr-4 text-yellow-500"></i>
              </span>
            
              <span @click="deletePlant(index)" v-if="!isEditGroup || !isEditPlant">
                <i class="far fa-trash-alt mr-1 text-red-500"></i>
              </span>

            </span>
          </li>
        </ul>
    </div>
    
    </div>
    <div class="bg-gray-100 text-center mt-0" v-if="isAddPlant">
        <h4>Add New Plant</h4>
        <div class="block mb-2">
                    <label for="plantIdAdd" class="block text-gray-400 text-sm">Plant ID</label>
                    <input v-model="strPlantId" id="plantIdAdd" type="text" class="w-full h-10 py-2 px-2 border-2 border-gray-300 rounded-md">
          </div>
        <div class="w-full">
          <button class="bg-blue-500 text-white font-bold w-full m-0 px-4 py-2" @click="savePlantInBd()">Save Plant</button>
        </div>
  
      </div>

      <div class="bg-gray-100 text-center mt-0" v-if="isEditPlant">
        <h4>Edit Plant</h4>
        <div class="block mb-2">
                    <label for="plantIdAdd" class="block text-gray-400 text-sm">Plant ID</label>
                    <input v-model="strPlantId" id="plantIdAdd" type="text" class="w-full h-10 py-2 px-2 border-2 border-gray-300 rounded-md">
          </div>
        <div class="w-full">
          <button class="bg-blue-500 text-white font-bold w-full m-0 px-4 py-2" @click="savePlantInBd()">Save Plant</button>
        </div>
  
      </div>

    
    <div class="flex justify-center bounce-in-bottom">
      
      <div class="w-full" v-if="arrPlants.length < 6 && !isAddPlant && !isEditPlant" >
        <button class="bg-green-500 text-white font-bold w-full m-0 px-4 py-2" @click="showFormAddPlant(plant)">Add Plant</button>
      </div>
  
      
    </div>
    
    
    
    
    
    
    <!-- <ModalForm
        v-show="isModalVisible"
        hideClose="true"
        classModal="modal w-1/2 h-1"
    >

    <template v-slot:body>
      <div class="h-auto flex flex-col items-center justify-center py-6">
      <div class="px-6 py-4">
          <h3 v-if="titleNewPlant">Add New Plant</h3>
          <h3 v-if="titleEditGroup">Edit Group</h3>


          <div class="block my-4" v-if="initialPlantModal">
                    <label for="groupId" class="block text-gray-400 text-sm">Group</label>
                    <input v-model="strGroupId" id="groupId" type="text" class="w-full h-10 py-2 px-2 border-2 border-gray-300 rounded-md">
          </div>
          <div class="block my-4" v-if="addPlantModal">
                    <label for="plantIdAdd" class="block text-gray-400 text-sm">Plant ID</label>
                    <input v-model="strPlantId" id="plantIdAdd" type="text" class="w-full h-10 py-2 px-2 border-2 border-gray-300 rounded-md">
          </div>
                
        </div>
        <div class="flex justify-center mt-6">
          <button class="bg-green-500 text-white font-bold w-full m-0 px-4 py-2" @click="AddPlantsInArr()">Add Plant</button>
        </div>
        </div>
    </template>

    </ModalForm>
      
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
        
    </modal> -->


  </div>
</template>

<script>
import plantServices from '../services/plant.services.js'
import ModalForm from '../components/ModalForm.vue'
export default {
  name: 'Account',
  components: {
    ModalForm
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
      isModalVisible: false,
      addPlantModal: false,
      initialPlantModal: false,
      titleNewPlant: false,
      titleEditGroup: false,


      //
      isAddPlant: false,
      isEditPlant: false,
      isEditGroup: false,
    }
  },
  
  async mounted() {
    this.localStorageUser = localStorage.getItem('user');
    this.numAccount = this.account.account;
    this.strGroupId = (this.account.grupo) && this.account.grupo;
    this.arrPlants = (this.account.plantid.length > 0) ? this.account.plantid: [];

  },

  methods: {

        showFormEditPlant(index) {
          this.strPlantId = this.arrPlants[index];
          this.arrPlants.splice(index,1);
          this.isEditPlant = true;
        },

        showFormAddPlant(plant){
          this.strPlantId = (plant) ? plant : '';
          this.isAddPlant = true;
          console.log(this.account.account);
        },

        showFormEditGroup(){
          this.isEditGroup = true;
        },

        async savePlantInBd() {

          if(this.strPlantId) {
            this.arrPlants.push(this.strPlantId);
            
            try {
              const saveBD = await this.addPlantInBD(this.arrPlants);
              this.isAddPlant = false;
              this.isEditPlant = false;
              this.strPlantId = '';
            } catch (error) {
              this.isAddPlant = false;
              this.isEditPlant = false;
              this.printErrors();
              this.strPlantId = '';
            }

          }
        },
        async addPlantInBD(arrPlants) {
          
          let plant = {
            plantid: Object.values(arrPlants),
            grupo: this.strGroupId,
            uid: this.localStorageUser,
            account: this.account.account
          };

          console.log(plant)

          try {
            const update = await plantServices.updateAccounts(plant);
            this.printSuccess()
            
            return update;
          } catch (error) {
            this.printErrors();
          }
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
            account: this.account.account
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
            account: this.account.account
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

        search() {},

        // Aux
        show() {
          this.strPlantId = '';
          if(this.arrPlants.length > 0) {
            this.titleNewPlant = true
            this.titleEditGroup = false
            this.addPlantModal = true
            this.initialPlantModal = false
          } else {
            this.titleNewPlant = true
            this.titleEditGroup = false
            this.initialPlantModal = true
            this.addPlantModal = true
          }
          this.isModalVisible = true
        },

        group() {
          this.isModalVisible = true
          this.titleEditGroup = true
          this.titleNewPlant = false
          this.addPlantModal = false;
          this.initialPlantModal = true;

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
            message: 'Oops! Something went wrong.',
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