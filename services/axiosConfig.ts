import axios from "axios";
let baseURL = "https://api.icestreethq.com/";
let token;
let User;

if (typeof window !== 'undefined') {
  // Perform localStorage action
  token = localStorage.getItem("token");
  User = localStorage.getItem("user");
}
axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.common["user"] = `${User}`;
}
const instance = axios.create({
  baseURL,
});


export const flutterWaveConfig = axios.create({
  baseURL: "https://api.flutterwave.com/v3",
  headers: {
    "Content-Type": 'application/json',
    "Authorization": `Bearer null`
  }
})

export default instance;
