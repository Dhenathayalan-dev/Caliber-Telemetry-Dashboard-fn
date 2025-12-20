import axios from "axios";
import { message, Modal } from "antd";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


API.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response.data && error.response.data?.isSuccess === false)
            Modal.error({
                title: "Error",
                content: error.response.data.error,
                okText: "OK",
            });
        if (error.response?.status === 401) {
            message.error("Session expired. Please login again.");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default API;
