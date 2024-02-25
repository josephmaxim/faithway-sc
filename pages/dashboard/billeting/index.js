import { useEffect, useState, forwardRef } from "react"; 
import Link from 'next/link';
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { getBilleting } from '@/controller/billeting'; 
import { Table, Breadcrumb, Panel } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

const Billeting = () => {

  const [list, setList] = useState([]);

  useEffect(() => {
    async function init(){
      let billetList = await getBilleting()
      billetList = billetList.map((i) => {
        return {
          ...i, 
          personsCount: i.persons.length,
          sponsorsCount: i.persons.filter((i) => i.type == "SPONSOR").length,
          studentsCount: i.persons.filter((i) => i.type == "MALE" || i.type == "FEMALE").length,
        }
      })
      setList(billetList)
    }
    init();
  }, [])

  return <DashboardLayout
    head={{
      title: "Billetings"
    }}
  >
    <div className="container">
      <MyBreadcrumb separator={'>'} />
      <h1>Billeting</h1>
      <br/>
      <Panel bordered bodyFill>
        <Table
          autoHeight={true}
          data={list}
        >
          <Column flexGrow={1}>
            <HeaderCell>Primary Contact</HeaderCell>
            <Cell>
              {rowData => (
                <Link href={`/dashboard/billeting/${rowData._id}`}>{rowData.primaryContact}</Link>
              )}
            </Cell>
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Church</HeaderCell>
            <Cell dataKey="church"/>
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Phone #</HeaderCell>
            <Cell dataKey="phone"/>
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email"/>
          </Column>


          <Column flexGrow={1} align="center">
            <HeaderCell>Student - Sponsors</HeaderCell>
            <Cell>
              {rowData => (
                <span>{rowData.studentsCount} - {rowData.sponsorsCount}</span>
              )}
            </Cell>
          </Column>
        </Table>
      </Panel>
    </div>
  </DashboardLayout>
}

const NavLink = forwardRef((props, ref) => {
  const { href, as, ...rest } = props;
  return (
    <Link href={href} as={as} ref={ref} {...rest}>
    
    </Link>
  );
});

const MyBreadcrumb = ({ separator }) => (
  <Breadcrumb separator={separator}>
    <Breadcrumb.Item as={NavLink} href="/dashboard">
      Dashboard
    </Breadcrumb.Item>
    <Breadcrumb.Item as={NavLink} href="/dashboard/billeting" active>
      Billeting
    </Breadcrumb.Item>
  </Breadcrumb>
);

export default Billeting;