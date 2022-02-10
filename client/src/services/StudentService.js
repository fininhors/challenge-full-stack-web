import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4000/api";

class StudentService {
    getAll() {
        return axios.get(`${API_URL}/v1/students`, { headers: authHeader() });
    }

    show(id) {
        return axios.get(`/students/${id}`, { headers: authHeader() });
    }

    create(data) {
        return axios.post("/students", data, { headers: authHeader() });
    }

    update(id, data) {
        return axios.put(`/students/${id}`, data, { headers: authHeader() });
    }

    delete(id) {
        return axios.delete(`/students/${id}`, { headers: authHeader() });
    }
}

export default new StudentService();
