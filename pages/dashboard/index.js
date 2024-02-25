import DashboardLayout from "@/components/Layouts/DashboardLayout";

const Dashboard = () => {
  return <DashboardLayout
    head={{
      title: "Dashboard Overview"
    }}
  >
    <div className="container">
      <h1>Dashboard</h1>
    </div>
  </DashboardLayout>
}

export default Dashboard;