import Error from 'next/error'
import DashboardLayout from '@/components/Layouts/DashboardLayout';

const Dashboard404Layout = (props) => {
  return <DashboardLayout
    head={{
      title: props.title
    }}
  >
    <div className="container">
      <h1>404 - {props.title}</h1>
    </div>
  </DashboardLayout>
}

export default Dashboard404Layout;