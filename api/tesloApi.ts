import axios from "axios";

const tesloAPI = axios.create({
  baseURL: "/api",
});

export default tesloAPI;
