import axios from "axios";
const IP = 'localhost';
const URL = `http://${IP}:3000`;

const updateAccounts = async (updatedDataPlants) => {
    const resp =  await axios.put(`${URL}/account/${updatedDataPlants.uid}`, updatedDataPlants);
    console.log(updatedDataPlants.uid)
    console.log(resp)
    return resp
};

const deleteAllPlants = async (userId) => {
    return await axios.delete(`${URL}/deletePlant/${userId}`);
};

const getPlantsBById = async (userId) => {
    return await axios.get(`${URL}/plant/${userId}`);
}


export default {
    updateAccounts,
    deleteAllPlants,
    getPlantsBById,
}