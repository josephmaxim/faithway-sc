import { createContext, useReducer, useEffect } from 'react';
import { getStudents, getChurches } from '@/controller/student';

export const StudentsContext = createContext();


const initFilters = {
  name: "",
  grade: '',
  church: '',
  event: '',
}

const initialState = {
  students: [],
  sortColumn: "",
  sortType: undefined,
  expandedRowKeys: [],
  limit: 10,
  page: 1,
  churchOptions: [],
  filters: initFilters,
  filterIsSet: false,
  isFetched: false
}

function reducer(state, action) {
  let value = action.payload?.value,
    param = action.payload?.param,
    id = action.payload?.id;

  switch (action.type) {
    case "INIT":    
      return {
        ...state,
        ...action.payload,
        isFetched: true
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
    case "SET_PAGE": 
      return {
        ...state,
        page: value
      }
    case "CHANGE_PAGE_LIMIT": 
      return {
        ...state,
        page: 1,
        limit: value
      }
    case "SET_FILTERS": 
      return {
        ...state,
        filters: {
          ...state.filters,
          [param]: value
        },
        filterIsSet: false
      }
    case "LOAD_STUDENTS":
      return {
        ...state,
        students: formatStudents(value),
        filterIsSet: true,
        isFetched: true
      }
    case "INIT_STUDENT_FETCH":
      return {
        ...state,
        isFetched: false
      }
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: initFilters,
        filterIsSet: false,
        students: formatStudents(value),
      }
    default:
      return state;
  }
}

const formatStudents = (students) => {
  return students?.map(i => {
    const overallMark = Math.round((i.events.reduce((total, i) => total + i.totalPoints, 0) / i.events.length + Number.EPSILON) * 100) / 100;
    let events = {}
    i.events.forEach(element => {
      events[element.value] = element.totalPoints
    });
    return {
      ...i, 
      overallMark, 
      eventCount: i.events.length,
      ...events
    }
  })
}

export default function StudentsProvider(props){

  const [ state, dispatch ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function init(){
      let students = await getStudents();

      let churchOptions = await getChurches();

      churchOptions = churchOptions.map((i) => ({value: i, label: i}))

      dispatch({type: 'INIT', payload: {
        students: formatStudents(students),
        churchOptions
      }})
    }
    init()
  },[]);

  return(
    <StudentsContext.Provider value={{state, dispatch}}>
      {props.children}
    </StudentsContext.Provider>
  );
}