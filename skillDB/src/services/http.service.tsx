import axios from 'axios';
const axiosRequest =  axios.create({
    baseURL: 'http://localhost:3000/',
    // headers: {'Authorization': 'Bearer '+token}
});


export default axiosRequest