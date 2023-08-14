import axios from "axios";

const instance =    axios.create({
    // baseURL: "https://localhost:7043/api/v1.0/shopping/"
    baseURL: "https://o8vodl3dv4.execute-api.us-east-1.amazonaws.com/test/api/v1.0/shopping/"
});

export default instance;