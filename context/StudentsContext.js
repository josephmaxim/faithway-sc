import { createContext, useReducer, useEffect } from 'react';
import { getStudents } from '@/controller/student';

export const StudentsContext = createContext();

const initialState = {
  students: [],
  sortColumn: "",
  sortType: undefined,
  expandedRowKeys: [],
}

function reducer(state, action) {
  let value = action.payload?.value,
    param = action.payload?.param,
    id = action.payload?.id;

  switch (action.type) {
    case "INIT":    
      return {
        ...state,
        ...action.payload
      }
    case "SET_SORT_COLUMN":    
      return {
        ...state,
        sortColumn: id,
        sortType: value
      }
    
    case "SET_EXPANDED_ROWS":    
      return {
        ...state,
        expandedRowKeys: state.expandedRowKeys.includes(id) ? state.expandedRowKeys.filter(i => i !== id) : [...state.expandedRowKeys, id]
        // expandedRowKeys: value
      }
    default:
      return state;
  }
}

export default function StudentsProvider(props){

  const [ state, dispatch ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function init(){
      let students = await getStudents();
      students = students.map(i => {
        const overallMark = Math.round((i.events.reduce((total, i) => total + i.totalPoints, 0) / i.events.length + Number.EPSILON) * 100) / 100;
        return {...i, overallMark, eventCount: i.events.length }
      })
      dispatch({type: 'INIT', payload: {students}})
    }
    init()
  },[]);

  return(
    <StudentsContext.Provider value={{state, dispatch}}>
      {props.children}
    </StudentsContext.Provider>
  );
}