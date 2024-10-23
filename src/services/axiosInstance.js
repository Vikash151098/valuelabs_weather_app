import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json'
    }
});


axiosInstance.interceptors.response.use((res) => { return res }, (err) => {
    alert("API Error")
    return;
})

export default axiosInstance;