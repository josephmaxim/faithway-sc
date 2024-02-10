import { createContext, useReducer, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getUser } from '@/controller/user'
import securedPages from '@/utils/securedPages'
import Router from "next/router"

export const UserContext = createContext()

const initialState = {
  info: {},
}

function reducer(state, action) {

  const value = action?.payload?.value;
  const id = action?.payload?.id;
  const param = action?.payload?.param


  switch (action.type) {
    case 'LOAD_USER':
      return {
        ...state,
        info: value,
      }
    default:
      return state;
  }
}

export default function UserProvider({children}){

  const pathname = useRouter().pathname
  const [ userState, userDispatch ] = useReducer(reducer, initialState);

  console.log("dwdw", pathname, userState.info)

  useEffect(()=>{
    async function initUserData(){
      const userData = await getUser();
      userDispatch({type: "LOAD_USER", payload: {value: userData}})
    }
    if(securedPages.includes(pathname) || pathname == '/login') initUserData()
    // redirect login to dashboard if user is logged in.
    if(pathname == '/login' && userState.info?.email) Router.push('/dashboard')
  }, [pathname])

  return(
    <UserContext.Provider value={{userState, userDispatch}}>
      {children}
    </UserContext.Provider>
  );
}