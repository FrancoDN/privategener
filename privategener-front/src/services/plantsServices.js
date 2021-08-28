import axios from "axios";
const URL = 'http://localhost:3000';

const postPlants = (dataPlants) => {
    axios.post(`${URL}/newPlant`, dataPlants).then((result) => {
        console.log(result);
    });
};

const updatePlants = (discord, dataPlants) => {
    axios.put(`${URL}/plant/${discord}`, dataPlants).then((result) => {
        console.log(result);
    });
};

const deletePlants = (discord) => {
    axios.delete(`${URL}/deletePlant/${discord}`).then((result) => {
        console.log(result);
    });
};

const getPlants = async (dis) => {
    console.log(dis);
    axios.get(`${URL}/planta/${dis}`).then((res) => {
        console.log(res);
    });
}


export default {
    postPlants,
    updatePlants,
    deletePlants,
    getPlants
}