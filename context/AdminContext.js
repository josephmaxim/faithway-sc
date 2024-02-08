import { createContext, useReducer } from 'react';

export const AdminContext = createContext();

const initialState = {
  toggleSideBar: false
}

function reducer(state, action) {
  let value = action.payload?.value,
    param = action.payload?.param,
    id = action.payload?.id;

  switch (action.type) {
    case "INIT":
      return action.payload
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        toggleSideBar: !state.toggleSideBar
      }
    default: 
      return state;
  }
}

export default function AdminProvider(props){

  const [ state, dispatch ] = useReducer(reducer, initialState);

  return <AdminContext.Provider value={{state, dispatch}}>
    {props.children}
  </AdminContext.Provider>
}