import axios from "axios";
import url from "../config/SpringboorServiceUrl.json";
const login = (username, password) => {
  
  return axios
    .post(url.AuthenticationService + url.Login, {
      username,
      password,
    })
    .then((response) => {
        const token = response.data.token;
        
      if (response.data.token) {
        sessionStorage.setItem("user", JSON.stringify(token));
      }
      
      return response;
    });
};
const logout = () => {
  sessionStorage.clear();
  localStorage.clear();
};
const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};
const AuthService = {
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
