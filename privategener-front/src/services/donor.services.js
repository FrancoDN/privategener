import axios from "axios";
const IP = 'localhost';
const URL = `http://${IP}:3000`;

const postDonor = async (dataDonor) => {
    return await axios.post(`${URL}/newDonor`, dataDonor);
};

const getDonorById = async (userId) => {
    return await axios.get(`${URL}/donor/${userId}`);
};

const getAccountsByUserId = async (userId) => {
  return await axios.get(`${URL}/accounts/${userId}`);
};

const getDonorLicense = async (userId) => {
  return await axios.get(`${URL}/license/${userId}`);
};

export default {
    postDonor,
    getDonorById,
    getAccountsByUserId,
    getDonorLicense,
}
