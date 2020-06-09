import axios from "axios";
import config from "./../../config";

export default axios.create({
  baseURL: config.SEARCH_API,
  headers: {
    "OT-Origin-Host": window.location.hostname,
  },
});
