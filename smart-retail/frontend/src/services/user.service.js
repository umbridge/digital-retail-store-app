import axios from "axios";
import authHeader from "./auth-header";
import url from "../config/SpringboorServiceUrl.json";



 const getUserDetails = () => {
  
  return axios.get(url.AuthenticationService +url.UserInfo, { headers: authHeader() }).then(response => response.data).catch(err => console.log(err));
 
  
};
const UserService = {

  getUserDetails
};
export default UserService;
