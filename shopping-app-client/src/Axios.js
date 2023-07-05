import axios from "axios";

const instance =    axios.create({
    baseURL: "https://localhost:7043/api/v1.0/shopping/"
});

export default instance;