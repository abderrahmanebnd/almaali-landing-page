import axios from "axios";
const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
export default axiosPrivate;
