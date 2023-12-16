import axios from "axios";

const url = "http://localhost:8080/";

const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default axiosInstance;
