<template>
  <div v-if="!loading">
    <mdb-row>
      <mdb-col class="col-1 text-center p-0">
        <mdb-btn
          tag="a"
          gradient="green"
          floating
          size="lg"
          icon="plus"
          class="ml-3 mt-3 white-text"
          @click="addModal()"
        ></mdb-btn>
      </mdb-col>
      <mdb-col class="col-1 text-center p-0">
        <mdb-btn
          tag="a"
          color="blue"
          floating
          class="mt-3 white-text"
          size="lg"
          icon="edit"
          @click="editModal()"
        ></mdb-btn>
      </mdb-col>
      <mdb-col class="col-1 text-center p-0">
        <mdb-btn
          tag="a"
          color="red"
          floating
          size="lg"
          icon="times"
          class="mt-3 white-text"
          @click="deleteAll()"
        ></mdb-btn>
      </mdb-col>
    </mdb-row>
    <mdb-row class="justify-content-center">
      <mdb-col class="col-6 align-items-center">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Plant ID</th>
          <th scope="col">Grupo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, index) in dataPlantsDonor" :key="index">
          <td>{{p }}</td>
          <td>{{donorGroup }}</td>
        </tr>
      </tbody>
    </table>
    </mdb-col>
    </mdb-row>
    <mdb-container v-if="add">
      <mdb-row class="justify-content-center">
        <mdb-col lg="4">
          <mdb-card>
            <mdb-card-body>
              <mdb-card-title>Agregar planta</mdb-card-title>
              <mdb-row>
                <mdb-col>
                  <mdb-input label="Plant ID" v-model="plantsId.plantId" />
                </mdb-col>
                <mdb-col>
                  <mdb-input label="Plant ID" v-model="plantsId.plantId2" />
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input label="Plant ID" v-model="plantsId.plantId3" />
                </mdb-col>
                <mdb-col>
                  <mdb-input label="Plant ID" v-model="plantsId.plantId4" />
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input label="Plant ID" v-model="plantsId.plantId5" />
                </mdb-col>
                <mdb-col>
                  <mdb-input label="Plant ID" v-model="plantsId.plantId6" />
                </mdb-col>
              </mdb-row>
              <mdb-input label="Grupo" v-model="grupo" />
              <mdb-btn color="primary" @click="addPlant()">Agregar</mdb-btn>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </mdb-container>

    <mdb-container v-if="edit">
      <mdb-row class="justify-content-center">
        <mdb-col lg="4">
          <mdb-card>
            <mdb-card-body>
              <mdb-card-title>Editar planta</mdb-card-title>
              <mdb-row>
                <mdb-col>
                  <mdb-input label="Plant ID" v-model="dataPlantsDonor[0]"></mdb-input>
                </mdb-col>
                <mdb-col>
                  <mdb-input label="Plant ID" v-model="dataPlantsDonor[1]" />
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input label="Plant ID" v-model="dataPlantsDonor[2]" />
                </mdb-col>
                <mdb-col>
                  <mdb-input label="Plant ID" v-model="dataPlantsDonor[3]" />
                </mdb-col>
              </mdb-row>
              <mdb-row>
                <mdb-col>
                  <mdb-input label="Plant ID" v-model="dataPlantsDonor[4]" />
                </mdb-col>
                <mdb-col>
                  <mdb-input label="Plant ID" v-model="dataPlantsDonor[5]" />
                </mdb-col>
              </mdb-row>
              <mdb-input label="Grupo" v-model="donorGroup" />
              <mdb-btn color="primary" @click="editModal()">Editar</mdb-btn>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import plantServices from "../services/plantsServices.js";
import firebase from "firebase";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  mdbBtn,
  mdbCard,
  mdbCardBody,
  mdbCardTitle,
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbInput,
} from "mdbvue";
import plantsServices from '../services/plantsServices.js';
export default {
  data() {
    return {
      add: false,
      edit: false,
      plantsId: {
        plantId: "",
        plantId2: "",
        plantId3: "",
        plantId4: "",
        plantId5: "",
        plantId6: "",
      },
      dataPlantsDonor: [],
      donorGroup: "",
      grupo: "",
      donorDiscord: "",
      existPlant: false,
      uid: "",
      response: "",
      loading: true
    };
  },
  name: "ButtonPage",
  components: {
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbInput,
  },
  async mounted() {
    this.uid = firebase.auth().currentUser.uid;
    await axios.get(`http://localhost:3000/donor/${this.uid}`).then((result) => (this.donorDiscord = result.data.discord)).finally(() => this.loading = false);
    await axios.get(`http://localhost:3000/plant/${this.donorDiscord}`).then((res) => {
      console.log(res.data.plantid);
      this.dataPlantsDonor = res.data.plantid
      this.donorGroup = res.data.grupo
          if (res.data == null) {
            console.log("No existen plantas de este usuario");
            this.existPlant = false;
          } else {
            console.log("Existen plantas de este usuario");
            this.existPlant = true;
          }
        });
  },
  methods: {
    addModal() {
      this.add = true;
      this.edit = false;
    },
    async deleteAll() {
      await plantsServices.deletePlants(this.donorDiscord);
    },
    async editModal() {
      let plantUpdate = {
        plantid: Object.values(this.dataPlantsDonor),
        grupo: this.donorGroup,
        discord: this.donorDiscord
      };
      console.log(this.response);
      await plantsServices.updatePlants(plantUpdate.discord, plantUpdate)
      console.log(this.dataPlantsDonor);
      this.edit = true;
      this.add = false;
    },
    async addPlant() {
      let plant = {
        plantid: Object.values(this.plantsId),
        grupo: this.grupo,
        discord: this.donorDiscord,
      };
      console.log(plant);
      if (this.existPlant == false) {
        console.log(this.existPlant);
        await plantServices.postPlants(plant);
      } else {
        console.log("no capo");
      }
      this.add = false;
      this.edit = false;
    },
  },
};
</script>