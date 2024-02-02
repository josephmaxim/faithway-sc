import axios from "axios";
const rootPath = '/api/v1';
import { notify } from "@/utils/notification";

export const submitRegistration = async (form) => {
  try {
    const { data } = await axios.post(`${rootPath}/student/register`, form)
    notify({
      message: 'Registration successfully submitted.',
      type: "success"
    })
    return data
  } catch (error) {
    notify({
      message: error.response.data.message,
      type: "danger"
    })
    return error.response.status;
  }
}