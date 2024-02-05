import { createContext, useReducer } from 'react';

export const BilletingContext = createContext();

const initialState = {
  formValue:{
    church: "",
    primaryContact: "",
    phone: "",
    email: ""
  },
  list: {
    male: [],
    female: [],
    sponsors: []
  },
  listForm: {
    male: "",
    female: "",
    sponsors: "",
  }
}

function reducer(state, action) {
  let value = action.payload?.value,
    param = action.payload?.param,
    id = action.payload?.id;

  switch (action.type) {
  case "INIT":
    return action.payload
  case "SET_FORM":
    return {
      ...state,
      formValue: {
        ...state.formValue, 
        ...value
      }
    }
  case "REMOVE_ITEM":
    console.log("removing", param, id)
    return {
      ...state,
      list: {
        ...state.list,
        [param]: state.list[param].filter((i, index) => index != id)
      }
    }
  case "ADD_ITEM":
    return {
      ...state,
      list: {
        ...state.list,
        [param]: [...state.list[param], state.listForm[param]]
      },
      listForm: {
        ...state.listForm,
        [param] : ""
      }
    }
  case "SET_ITEM_FORM":
    return {
      ...state,
      listForm: {
        ...state.listForm,
        [param]: value
      }
    }
  case "RESET_FORM":
    return initialState;
  default:
    return state;
  }
}

export default function BilletingProvider(props){

  const [ billetState, billetDispatch ] = useReducer(reducer, initialState);

  return(
    <BilletingContext.Provider value={{billetState, billetDispatch}}>
      {props.children}
    </BilletingContext.Provider>
  );
}