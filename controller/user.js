import { notify } from "@/utils/notification";
import axios from "axios";
const rootPath = '/api/v1';

export const loginUser = async (form) => {
  try {
    const { data, status } = await axios.post(`${rootPath}/auth/login`, form)
    
    return status
  } catch (error) {
    if(error.response.status != 403) notify({
      message: error.response.data.message,
      type: "danger"
    })
    return error.response.status;
  }
}

export const getUser = async () => {
  try {
    const { data } = await axios.get(`${rootPath}/auth`);
    return data
  } catch (error) {
    console.log(error)
  }
}