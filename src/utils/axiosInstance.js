import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const axiosInstance = axios.create({
  baseURL: "https://petlove.b.goit.study/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error("Unauthorized. Please login again");

          localStorage.removeItem("token");
          clearAuthHeader();

          if (
            window.location.pathname.includes("profile") ||
            window.location.pathname.includes("add-pet")
          ) {
            window.location.href = "/login";
          }

          break;
        case 404:
          toast.error("Resource not found");
          break;
        case 500:
          toast.error("Server error. Please try again later");
          break;
        default:
          toast.error(error.response.data.message || "Something went wrong");
      }
    } else if (error.request) {
      toast.error("No response from server. Please check your connection");
    } else {
      toast.error("Request error. Please try again");
    }

    return Promise.reject(error);
  }
);

export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axiosInstance.defaults.headers.common.Authorization = "";
};

export default axiosInstance;
