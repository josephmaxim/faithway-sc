import axios from "axios";
const rootPath = '/api/v1';
import { notify } from "@/utils/notification";

export const submitRegistration = async (form) => {
  try {
    const { data } = await axios.post(`${rootPath}/students/register`, form)
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
    return;
  }
}

export const getStudents = async () => {
  try {
    const { data } = await axios.get(`${rootPath}/students`);
    return data
  } catch (error) {
    console.log(error)
  }
}