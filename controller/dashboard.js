import axios from "axios";
const rootPath = '/api/v1';
import { notify } from "@/utils/notification";

export const getOverviewStat = async () => {
  try {
    const { data } = await axios.get(`${rootPath}/dashboard`);
    return data
  } catch (error) {
    console.log(error)
    return;
  }
}
