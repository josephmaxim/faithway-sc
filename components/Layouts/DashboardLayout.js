import { useContext } from 'react'; 
import AdminProvider, {AdminContext} from '@/context/AdminContext';
import AdminNav from '@/components/Nav/AdminNav';
import AdminSidebar from '../Nav/AdminSidebar';
import HeadTags from '@/components/SEO'

const DashboardLayout = (props) => {

  const { state, dispatch } = useContext(AdminContext);
  const {toggleSideBar} = state;

  return  <main className="dashboard-layout">
    <HeadTags
      {...props.head}
    />
    <AdminNav/>
    <div className={`main-content ${toggleSideBar ? "show-sidebar" : ""}`}>
      <AdminSidebar/>
      <div className="content-block">
        {props.children}
      </div>
    </div>
  </main>
}

export default function DashboardLayoutHOC(props){
  return <AdminProvider>
    <DashboardLayout {...props}/>
  </AdminProvider>
}