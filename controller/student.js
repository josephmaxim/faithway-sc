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
    return {};
  }
}

export const updateStudentInfo = async (form) => {
  try {
    const { data } = await axios.put(`${rootPath}/students/${form._id}`, form);
    notify({
      message: `Successfully updated student info.`,
      type: "success",
    });
    return data;
  } catch (error) {
    console.log(error.response.data.error.message);
    return null;
  }
}

export const deleteStudent = async (form) => {
  try {
    const { data } = await axios.put(`${rootPath}/students/${form._id}/delete`, {
      password: form.password
    });
    notify({
      message: `Successfully deleted student.`,
      type: "success"
    })
    return data;
  } catch (error) {
    console.log(error)
    notify({
      message: error.response.data.message,
      type: "danger"
    })
    return null;
  }
}

export const updateEventScore = async (form) => {
  try {
    const { data } = await axios.put(`${rootPath}/students/${form._id}/edit-event/${form.eventKey}`, form);
    notify({
      message: `Successfully updated event.`,
      type: "success",
    });
    return data;
  } catch (error) {
    console.log(error.response.data.error.message);
    return null;
  }
}

export const removeEvent = async (form) => {
  try {
    const { data } = await axios.post(`${rootPath}/students/${form.studentId}/delete-event/${form.eventId}`)
    notify({
      message: 'Successfully removed event from user.',
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

export const addEvent = async (form) => {
  try {
    const { data } = await axios.post(`${rootPath}/students/${form.studentId}/add-event`, form)
    notify({
      message: 'Successfully added new event.',
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