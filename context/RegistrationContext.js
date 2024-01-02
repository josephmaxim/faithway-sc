import { createContext, useReducer } from 'react';

export const RegistrationContext = createContext();

const initialState = {
  formValue:{
    fullName: "",
    gender: "",
    church: "",
    grade: "",
    academics: [],
    arts:[],
    athletics: [],
    speech: [],
    vocal:[],
    instrumental: [],
    mathGrade: '',
    email: ""
  },
  togglePreview: false,
  isSubmitted: false
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
  case "TOGGLE_PREVIEW":
    return {
      ...state,
      togglePreview: !state.togglePreview
    }
  case "RESET_FORM":
    return initialState;
  case "SUBMIT_SUCCESS":
    return {
      ...initialState,
      togglePreview: true,
      isSubmitted: true,
    }
  default:
    return state;
  }
}

export default function RegistrationProvider(props){

  const [ regState, regDispatch ] = useReducer(reducer, initialState);

  return(
    <RegistrationContext.Provider value={{
      regState, 
      regDispatch
    }}>
      {props.children}
    </RegistrationContext.Provider>
  );
}