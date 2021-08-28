import axios from "axios";
const URL = 'http://localhost:3000';

const postDonor = (dataDonor) => {
    axios.post(`${URL}/newDonor`, dataDonor).then((result) => {
        console.log(result);
      });
};

const getDonor = (dataDonor) => {
    axios.get(`http://localhost:3000/donor/${dataDonor}`).then((result) => {
      console.log(result);
    });
};


    

export default {
    postDonor,
    getDonor 
}

//asdad