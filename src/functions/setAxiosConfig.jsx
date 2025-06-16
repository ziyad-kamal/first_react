import axios from "axios";

export const setAxiosConfig = () => {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
    axios.defaults.headers.post["Content-Type"] = "application/json";
};
