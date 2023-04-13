import axios from "axios";

const API_URL = import.meta.env.VITE_CORE_URL;

class AuthService {
  async login(user) {
    const rs = await axios.post(API_URL + "/api/login", {
      username: user.username,
      password: user.password,
    });
    console.log("depois do login em authservice.js");
    console.log(rs);
    return rs;
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
