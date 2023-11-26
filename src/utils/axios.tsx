import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://budget-app-bz54x.ondigitalocean.app",
});

export default axiosInstance;
