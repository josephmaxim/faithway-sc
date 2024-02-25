import axios from "axios";
const rootPath = '/api/v1';
import { notify } from "@/utils/notification";

export const submitBilleting = async (form) => {
  try {
    const { data } = await axios.post(`${rootPath}/billeting`, form)
    notify({
      message: 'Billeting successfully submitted.',
      type: "success",
      duration: "5000"
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

export const getBilleting = async () => {
  try {
    const { data } = await axios.get(`${rootPath}/billeting`);
    return data
  } catch (error) {
    console.log(error)
    return;
  }
}

export const getBilletingById = async (id) => {
  try{
    const { data } = await axios.get(`${rootPath}/billeting/${id}`);
    return data
  } catch (error) {
    console.log(error)
    return null;
  }
}

