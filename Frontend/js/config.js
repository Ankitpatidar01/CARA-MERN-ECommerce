const API_URL = "http://localhost:5050";

Object.defineProperty(window, "authHeaders", {
    get() {
        const token = localStorage.getItem("accessToken");

        return {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : ""
        };
    }
});