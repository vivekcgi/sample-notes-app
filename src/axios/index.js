import axios from "axios";

const apiHost = process.env.VUE_APP_API_HOST || "/";

let baseURL = "api";

if (apiHost) {
  baseURL = `${apiHost}api`;
}
export default axios.create({ baseURL: baseURL });
