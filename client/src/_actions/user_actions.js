import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

async function LoginUser(dataToSubmit) {
  const request = await axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
async function RegisterUser(dataToSubmit) {
  const request = await axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}
async function AuthUser() {
  const request = await axios
    .get("/api/users/auth")
    .then((response) => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
export { LoginUser, RegisterUser, AuthUser };
