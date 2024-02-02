import axios from "axios";
const rootPath = '/api/v1';
import {useToaster} from 'rsuite'
import { notify } from "@/utils/notification";

export const submitRegistration = async (form) => {
  try {
    const { data } = await axios.post(`${rootPath}/student/register`, form)
    console.log("Fetching data..." , data)
    
    return data
  } catch (error) {
    // toaster.push(notify({
    //   type:"error",
    //   header: "Error",
    //   message: "Please fill out the required fields."
    // }), {placement: 'bottomEnd'});
    return error.response.status;
  }
}