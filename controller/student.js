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

export const getStudents = async (filters) => {
  try {
    const { data } = await axios.get(`${rootPath}/students`, {
      params: filters
    });
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getChurches = async () => {
  try {
    const { data } = await axios.get(`${rootPath}/students/church`);
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getStudent = async (id) => {
  try {
    const { data } = await axios.get(`${rootPath}/students/${id}`);
    return data
  } catch (error) {
    console.log(error)
  }
}