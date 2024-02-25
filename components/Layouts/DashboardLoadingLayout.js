import { Loader } from 'rsuite';
import DashboardLayout from '@/components/Layouts/DashboardLayout';

const DashboardLoadingLayout = (props) => {
  return <DashboardLayout
    head={{
      title: 'Loading...'
    }}
  >
    <br/>
    <br/>
    <br/>
    <center>
      <Loader size="md" content="Loading Please Wait..." vertical/>
    </center>
  </DashboardLayout>
}

export default DashboardLoadingLayout;