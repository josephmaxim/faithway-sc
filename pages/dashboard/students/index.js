import { forwardRef, useContext } from "react"; 
import StudentsProvider, {StudentsContext} from '@/context/StudentsContext';
import Link from 'next/link';
import { Table, Breadcrumb, Panel, IconButton, TagGroup, Tag, Pagination, Form, Button, InputPicker, Input, TagPicker, CheckPicker, SelectPicker, ButtonToolbar } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
import { Col, Row } from 'reactstrap';
import { getStudents } from '@/controller/student';

import DashboardLayout from "@/components/Layouts/DashboardLayout";

import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import UserIcon from '@rsuite/icons/legacy/User';
import {findEventValue} from '@/utils/commons';
import { grades, eventOptions } from '@/utils/InputData'; 

const Students = () => {

  const { state, dispatch } = useContext(StudentsContext);
  const { students, sortColumn, sortType, expandedRowKeys, limit, page, churchOptions, filters, filterIsSet } = state;

  const filteredStudents = () => {

    let filteredStudents = students.filter((v, i) => {
      const start = limit * (page - 1);
      const end = start + limit;
      return i >= start && i < end && (filters.name != '' ? v.fullName.toLowerCase().includes(filters.name.toLowerCase()) : true);
    });
  

    if (sortColumn && sortType) {
      return filteredStudents.sort((a, b) => {
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
    return filteredStudents;
  } 

  const renderRowExpanded = row => {
    return (
      <div style={{borderBottom: "1px solid #f0f0f0", height: '100%'}}>
        <h2>Events:</h2>
        <TagGroup>
          { row.events.map((i, key) => <Tag key={key} size="lg">
            {findEventValue(i.value)}{i.value == 'math' ? ` Grade ${row.mathGrade}` : ''} (<strong style={{color: "green"}}>{i.totalPoints}</strong>)
          </Tag>) }
        </TagGroup>
      </div>
    );
  };

  const filterInputStyle = { width: "100%", marginBottom:"10px" }

  const filterInputOnChange = (e) => {
    const {value, name} = e.target
    dispatch({type: "SET_FILTERS", payload: {value, param: name}})
  }

  const handleFilterSubmit = async () => {
    const value = await getStudents(filters);
    dispatch({type: "LOAD_STUDENTS", payload: {value}})
  }

  const filtersCount = Object.keys(filters).filter(i => filters[i] != '').length;

  const handleClearFilters = async () => {
    const value = await getStudents()
    dispatch({type: 'CLEAR_FILTERS', payload: {value}});
  }

  return <DashboardLayout>
    <div className="container">
      <MyBreadcrumb separator={'>'} />
      <h1>Students</h1>
      <br/>
      <form>
        <Row>
          <Col sm={12} md={3}>
            <Input placeholder="Name" onChange={(value) => filterInputOnChange({target: {value, name: 'name'}})} style={filterInputStyle} value={filters.name} size="sm"/>
          </Col>
          <Col sm={12} md={2}>
            <InputPicker data={grades} name="grade" size="sm" style={filterInputStyle} onChange={(value) => filterInputOnChange({target: {value, name: 'grade'}})} value={filters.grade} placeholder="Grade"/>
          </Col>
          <Col sm={12} md={2}>
            <SelectPicker data={churchOptions} name="church" onChange={(value) => filterInputOnChange({target: {value, name: 'church'}})} size="sm" value={filters.church} style={{...filterInputStyle, height: 32.85}} placeholder="Church"/>
          </Col>
          <Col sm={12} md={3}>
            <SelectPicker label="Event" data={eventOptions()} onChange={(value) => filterInputOnChange({target: {value, name: 'event'}})} groupBy="role" value={filters.event} size="sm" style={filterInputStyle} />
          </Col>
          <Col sm={12} md={2}>
            <div>
              <ButtonToolbar style={{flexWrap: "unset"}}>
              <Button size="sm" appearance="primary" onClick={handleFilterSubmit} style={filterInputStyle} >Apply { !filterIsSet ? filtersCount <= 0 ? "" : `(${filtersCount})` : ""}</Button>
              <Button size="sm" appearance="default" onClick={handleClearFilters} style={filterInputStyle} >Clear { filterIsSet ? `(${filtersCount})` : ""}</Button>
            </ButtonToolbar>
            </div>
          </Col>
        </Row>
      </form>
      <Panel bordered bodyFill>
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

          {
            filters.event != '' && filterIsSet ? 
              <Column  width={90} align="center" sortable>
                <HeaderCell>{findEventValue(filters.event)}</HeaderCell>
                <Cell dataKey={filters.event} />
              </Column>
            : 
              <Column  width={120} align="center" sortable>
                <HeaderCell>Overall Mark</HeaderCell>
                <Cell dataKey="overallMark"/>
              </Column>
          }

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
          limit={limit}
          activePage={page}
          onChangePage={value => dispatch({type: "SET_PAGE", payload: {value}})}
          onChangeLimit={value => dispatch({type: "CHANGE_PAGE_LIMIT", payload: {value}})}
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