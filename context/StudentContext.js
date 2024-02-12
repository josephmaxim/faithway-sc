import { createContext, useReducer, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getStudent } from '@/controller/student'

export const StudentContext = createContext()

const initialState = {
  info: {},
}

function reducer(state, action) {

  const value = action?.payload?.value;
  const id = action?.payload?.id;
  const param = action?.payload?.param


  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        info: value,
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
      dispatch({type: "INIT", payload: {value: student}})
    }
    if(studentId) init()
  }, [studentId])

  return(
    <StudentContext.Provider value={{state, dispatch}}>
      {children}
    </StudentContext.Provider>
  );
}