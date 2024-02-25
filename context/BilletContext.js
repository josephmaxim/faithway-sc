import { createContext, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router'
import { getBilletingById } from '@/controller/billeting'
import Dashboard404Layout from '@/components/Layouts/Dashboard404Layout'

export const BilletContext = createContext();

const initialState = {
  info: {},
  form: {},
  filters: ['ALL', 'SPONSOR', 'MALE', 'FEMALE'],
  selectedFilters: [],
  toggleEdit: false
}

function reducer(state, action) {
  let value = action.payload?.value,
    param = action.payload?.param,
    id = action.payload?.id;

  switch (action.type) {
  case "INIT":    
    return {
      ...state,
      form: value,
      info: value
    }
  case "ADD_FILTER": {
    let filters = state.selectedFilters;

    if(state.selectedFilters.includes(value)){
      filters = state.selectedFilters.filter(i => i !== value)
    } else {
      filters = [...state.selectedFilters, value]
    }
    if(value == "ALL") filters = [];

    return {
      ...state,
      selectedFilters : filters
    }
  }
  case "TOGGLE_EDIT":    
    return {
      ...state,
      toggleEdit: !state.toggleEdit,
      form: state.info
    }
  case "EDIT_FORM":
    return {
      ...state,
      form: value
    }
  default:
    return state;
  }
}

export default function BilletProvider(props){

  const router = useRouter()
  const { billetId } = router.query;
  const [ state, dispatch ] = useReducer(reducer, initialState);

  useEffect(()=> {
    async function init(){
      const value = await getBilletingById(billetId)
      dispatch({type: "INIT", payload: { value }})
    }
    if(billetId) init()
  },[billetId])

  if(!state.info?._id) return <Dashboard404Layout
    title= "Billet Not Found"
    statusCode={404}
  />

  return(
    <BilletContext.Provider value={{state, dispatch}}>
      {props.children}
    </BilletContext.Provider>
  );
}