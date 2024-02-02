import axios from "axios";
const rootPath = '/api/v1';

export const submitRegistration = async (form) => {
  try {
    const { data } = await axios.post(`${rootPath}/student/register`, form)
    return data
  } catch (error) {
    notify({
      message: error.response.data.message,
      type: "danger"
    })
    return error.response.status;
  }
}