import axios from "axios";

const url = "https://budget-app-bz54x.ondigitalocean.app";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

export default axiosInstance;
