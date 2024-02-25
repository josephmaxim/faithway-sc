import { createContext, useReducer, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getStudent } from '@/controller/student'
import Dashboard404Layout from '@/components/Layouts/Dashboard404Layout'

export const StudentContext = createContext()

const initialState = {
  info: {},
  formData: {
    fullName: "",
    gender: "",
    church: "",
    grade: ""
  },
  toggleEditInfo: false,
  newEvent: "",
  newEventMath: "",
  isFetched: false,
}

function reducer(state, action) {

  const value = action?.payload?.value;
  const id = action?.payload?.id;
  const param = action?.payload?.param


  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        info: {
          ...value,
          events: value?.events?.map((i) => {return {...i, formValue: i.totalPoints, isEdit: false}})
        },
        formData: {...value, grade: value?.grade?.toString()},
        newEvent: "",
        isFetched: true
      }
    case 'TOGGLE_EDIT_INFO':
      return {
        ...state,
        toggleEditInfo: !state.toggleEditInfo
      }
    case 'CANCEL_EDIT_INFO': 
      return {
        ...state,
        toggleEditInfo: false,
        formData: {...state.info, grade: state.info.grade.toString()}
      }
    case 'FORM_CHANGE':
      return {
        ...state,
        formData: {...value, grade: value.grade.toString()}
      }
    case 'LOAD_UPDATED_DATA':
      return {
        ...state,
        info: value,
        formData: value,
        toggleEditInfo: false
      }
    case 'TOGGLE_EDIT_EVENT':
      return {
        ...state,
        info: {
          ...state.info,
          events: state.info.events.map((i) => {
            if(i._id == id) return {...i, isEdit: !i.isEdit, formValue: i.totalPoints}
            return {...i, formValue: i.totalPoints, isEdit: false}
          })
        }
      }
    case 'EDIT_EVENT_SCORE':
      return {
        ...state,
        info: {
          ...state.info,
          events: state.info.events.map((i) => {
            if(i._id == id) return {...i, formValue: value}
            return {...i, formValue: i.totalPoints, isEdit: false}
          })
        }
      }
    case 'NEW_EVENT_FORM':
      return {
        ...state,
        newEvent: value
      }
    case 'NEW_EVENT_MATH_GRADE':
      return {
        ...state,
        newEventMath: value
      }
    default:
      return state;
  }
}

export default function StudentProvider({children}){

  const router = useRouter()
  const { studentId } = router.query;
  const [ state, dispatch ] = useReducer(reducer, initialState);

  useEffect(()=>{
    async function init(){
      const student = await getStudent(studentId)
      if(student) dispatch({type: "INIT", payload: {value: student}})
    }
    if(studentId) init()
  }, [studentId])

  if(!state.info?._id && state.isFetched) return <Dashboard404Layout
    title= "Student Not Found"
    statusCode={404}
  />

  return(
    <StudentContext.Provider value={{state, dispatch}}>
      {children}
    </StudentContext.Provider>
  );
}