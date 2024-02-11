import { forwardRef, useContext } from "react"; 
import StudentsProvider, {StudentsContext} from '@/context/StudentsContext';
import Link from 'next/link';
import { Table, Breadcrumb, Panel, IconButton, TagGroup, Tag, Pagination } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

import DashboardLayout from "@/components/Layouts/DashboardLayout";

import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import UserIcon from '@rsuite/icons/legacy/User';
import {findEventValue} from '@/utils/commons';

const Students = () => {

  const { state, dispatch } = useContext(StudentsContext);
  const { students, sortColumn, sortType, expandedRowKeys } = state;

  const filteredStudents = () => {
    if (sortColumn && sortType) {
      return students.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return students;
  } 

  const renderRowExpanded = row => {
    return (
      <div style={{borderBottom: "1px solid #f0f0f0", height: '100%'}}>
        <h2>Events:</h2>
        <TagGroup>
          { row.events.map((i, key) => <Tag key={key} size="lg">{findEventValue(i.value)} (<strong style={{color: "green"}}>{i.totalPoints}</strong>)</Tag>) }
        </TagGroup>
      </div>
    );
  };

  console.log(students)

  return <DashboardLayout>
    <div className="container">
      <MyBreadcrumb separator={'>'} />
      <h1>Students</h1>
      <br/>
      <Panel bordered>
        <Table
          shouldUpdateScroll={false}
          autoHeight={true}
          data={filteredStudents()}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={(sortColumn, sortType) => {
            dispatch({type: "SET_SORT_COLUMN", payload: {
              id: sortColumn,
              value: sortType 
            }});
          }}
          loading={false}
          rowKey={'_id'}
          expandedRowKeys={expandedRowKeys}
          renderRowExpanded={renderRowExpanded}
          rowExpandedHeight={150}
        >

          <Column width={70} align="center">
            <HeaderCell>#</HeaderCell>
            <Cell style={{ padding: 5 }}>
              {rowData => (
                <IconButton
                  appearance="subtle"
                  onClick={() => dispatch({ type: "SET_EXPANDED_ROWS", payload: {id: rowData._id}})}
                  icon={
                    expandedRowKeys.some(key => key === rowData._id) ? (
                      <CollaspedOutlineIcon />
                    ) : (
                      <ExpandOutlineIcon />
                    )
                  }
                />
              )}
            </Cell>
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="fullName">
              {row => (
                <>
                  <UserIcon style={{width: 15, color: row.gender === 'male' ? '#3498db' : '#9b59b6'}}/> <Link href={`/dashboard/students/${row._id}`} style={{color: '#3c6382'}}>{row.fullName}</Link>
                </>
              )}
            </Cell>
          </Column>

          <Column  width={90} align="center" sortable>
            <HeaderCell>Grade</HeaderCell>
            <Cell dataKey="grade" />
          </Column>

          <Column  width={120} align="center" sortable>
            <HeaderCell>Overall Mark</HeaderCell>
            <Cell dataKey="overallMark"/>
          </Column>

          <Column  width={90} align="center" sortable>
            <HeaderCell># Events</HeaderCell>
            <Cell dataKey="eventCount"/>
          </Column>

          <Column  flexGrow={1} sortable>
            <HeaderCell>Church</HeaderCell>
            <Cell dataKey="church" />
          </Column>

        </Table>
        <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={students.length}
          limitOptions={[10, 30, 50, 100, 500]}
          limit={5}
          activePage={1}
          onChangePage={() => {}}
          onChangeLimit={() => {}}
        />
      </div>
      </Panel>
    </div>
  </DashboardLayout>
}

const NavLink = forwardRef((props, ref) => {
  const { href, as, ...rest } = props;
  return (
    <Link href={href} as={as} ref={ref} {...rest}/>
  );
});

const MyBreadcrumb = ({ separator }) => (
  <Breadcrumb separator={separator}>
    <Breadcrumb.Item as={NavLink} href="/dashboard">
      Dashboard
    </Breadcrumb.Item>
    <Breadcrumb.Item as={NavLink} href="/dashboard/students" active>
      Students
    </Breadcrumb.Item>
  </Breadcrumb>
);



export default function StudentsHOC(){
  return <StudentsProvider>
    <Students/>
  </StudentsProvider>
};