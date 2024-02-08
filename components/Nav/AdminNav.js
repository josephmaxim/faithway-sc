import { useContext } from 'react'; 
import Link from 'next/link';
import AdminProvider, {AdminContext} from '@/context/AdminContext';
import MainLogo from '../Vectors/MainLogo';

const AdminNav = () => {


  const { state, dispatch } = useContext(AdminContext);
  const { toggleSideBar } = state;

  return <div className={`admin-nav`}>
    <button 
      className={`menu-btn ${toggleSideBar ? "open" : ""}`}
      onClick={() => dispatch({type: "TOGGLE_SIDEBAR"})}
      aria-label="menu"
    >
      <div className="icon"></div>
    </button>
    <Link 
      href="/"
      className="logo" 
      onClick={() => globalDispatch({type: "RESET_DEFAULT"})}
      aria-label="Student Convention"
    >
      <MainLogo/>
    </Link>
    <div className="nav-hybrid">
      Logout
    </div>
  </div>
}

export default AdminNav;