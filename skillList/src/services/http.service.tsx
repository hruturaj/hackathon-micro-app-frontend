import axios from "axios";
const axiosRequest = axios.create({
  baseURL: "http://localhost:3001/",
  // headers: {'Authorization': 'Bearer '+token}
});

export const axiosRequestApp1 = axios.create({
  baseURL: "http://localhost:3000/",
  // headers: {'Authorization': 'Bearer '+token}
});

export default axiosRequest;
