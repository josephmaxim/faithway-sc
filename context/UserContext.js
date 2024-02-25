import { createContext, useReducer, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getUser } from '@/controller/user'
import securedPages from '@/utils/securedPages'

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

  const router = useRouter()
  const {pathname, replace} = router
  const [ userState, userDispatch ] = useReducer(reducer, initialState);

  useEffect(()=>{
    async function initUserData(){
      const userData = await getUser();
      if(!userData._id) return replace('/login')
      userDispatch({type: "LOAD_USER", payload: {value: userData}})
    }
    if(securedPages.includes(pathname)) initUserData()
  }, [pathname])

  if(securedPages.includes(pathname) && !userState.info?._id) {
    return <></>
  }

  return(
    <UserContext.Provider value={{userState, userDispatch}}>
      {children}
    </UserContext.Provider>
  );
}