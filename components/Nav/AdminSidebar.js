import { useContext, useEffect} from 'react';
import {AdminContext} from '@/context/AdminContext';
import Link from 'next/link';
import MainLogo from '../Vectors/MainLogo';

const AdminSidebar = () => { 

  const { state, dispatch } = useContext(AdminContext);
  const { toggleSideBar } = state;
  
  return <nav className="admin-sidebar">
    <div className="sb-head">
      <Link href="/" className="logo" prefetch={false}>
        <MainLogo/>
      </Link>
    </div>
    <div className={`main-nav`}>
      <div className="main-nav-wrapper">
        <ul>
          <li><Link href="/dashboard"><span>Dashboard</span></Link></li>
          <li><Link href="/dashboard/students">Students</Link></li>
          <li><Link href="/dashboard/billeting">Billeting</Link></li>
        </ul>
      </div>
    </div>
  </nav>
}

export default AdminSidebar;