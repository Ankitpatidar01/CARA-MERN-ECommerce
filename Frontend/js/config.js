const API_URL = "http://localhost:5050";

const token = localStorage.getItem("accessToken");

const authHeaders = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : ""
};