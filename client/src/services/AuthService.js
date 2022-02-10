import axios from "axios";

const API_URL = "http://localhost:4000/api";

class AuthService {
    login(user) {
        return axios.post(API_URL + "/v1/login", user).then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(user) {
        return axios.post(API_URL + "/v1/register", user).then((response) => {
            return response.data;
        });
    }
}

export default new AuthService();
