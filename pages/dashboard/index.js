import { useState, useEffect } from 'react';
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { getOverviewStat } from "@/controller/dashboard";
import { Container, Row, Col } from 'reactstrap';
import { Panel, Loader } from 'rsuite';


const Dashboard = () => {

  const [stats, setStats] = useState({})
  const [isFetched, setIsFetched] = useState(false)
  
  useEffect(() => {
    async function init() {
      const value = await getOverviewStat();
      setStats(value)
      setIsFetched(true)
    }
    init()
  },[])

  console.log(stats)

  const Cell = (props) => <Col sm="12" lg="3">
    <Panel bordered>
      <span>{props.header}</span>
      <div style={{fontSize: "35px", margin: 0, fontWeight: "800"}}>
        {props.value}
      </div>
    </Panel>
    <br/>
  </Col>

  return <DashboardLayout
    head={{
      title: "Dashboard Overview"
    }}
  >
    <Container>
      <h1>Dashboard</h1>
      <br/>
    {
      isFetched ? 
        <Row>
          <Cell header="Student Count" value={stats?.studentCount}/>
          <Cell header="Total Event Count" value={stats?.totalNumberEvents}/>
          <Cell header="Billeting Applications" value={stats?.billetingCount}/>
          <Cell header="# Need Billeting" value={stats?.totalBilletPersons}/>
        </Row>
      :
        <center>
          <br/>
          <br/>
          <Loader size="md" content="Loading Please Wait..." vertical/>
        </center> 
    }
    </Container>
  </DashboardLayout>
}

export default Dashboard;