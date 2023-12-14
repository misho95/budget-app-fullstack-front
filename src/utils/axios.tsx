import axios from "axios";

const url = "https://budget-app-bz54x.ondigitalocean.app";

const axiosInstance = axios.create({
  baseURL: url,
});

export default axiosInstance;
