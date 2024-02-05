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
    return error.response.status;
  }
}