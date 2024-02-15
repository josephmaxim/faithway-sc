import { useContext, forwardRef, useRef } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import StudentProvider, { StudentContext } from "@/context/StudentContext";
import { Table, Breadcrumb, Panel, IconButton, TagGroup, Tag, Pagination, Form, Button, InputPicker, Input, TagPicker, Stack, SelectPicker,InputNumber, ButtonToolbar, Schema, RadioGroup, Radio, Divider } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
import { Col, Row } from 'reactstrap';

import { grades, eventOptions } from "@/utils/InputData";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { updateStudentInfo, deleteStudent, updateEventScore, removeEvent, addEvent } from '@/controller/student';
import { findEventValue } from '@/utils/commons';

import PageIcon from '@rsuite/icons/Page';
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import CheckIcon from '@rsuite/icons/Check';
import PlusIcon from '@rsuite/icons/Plus';
import { notify } from "@/utils/notification";

const StudentPage = () => {

  const infoFormRef = useRef();
  const router = useRouter();
  const { state, dispatch } = useContext(StudentContext)
  const { info, formData, toggleEditInfo, newEvent, newEventMath } = state;

  const handleFormChange = (value, e) => {
    dispatch({type: "FORM_CHANGE", payload: {value}})
  }

  const _handleUpdateInfoBtn = async () => {
    if (!infoFormRef.current.check()) return;
    const value = await updateStudentInfo({_id: info._id, ...formData})
    dispatch({type: "LOAD_UPDATED_DATA", payload: {value}})
  }

  const handleDeleteStudent = async () => {
    const password = prompt("To delete student record please type the form submission password.")

    if(password) {
      const res = await deleteStudent({_id: info._id, password })
      if(res) router.replace('/dashboard/students')
    }
    
  }

  const model = Schema.Model({
    fullName: Schema.Types.StringType().isRequired('Please enter the name of student'),
    gender: Schema.Types.StringType().isRequired('Gender is required'),
    church: Schema.Types.StringType().isRequired('Church is required'),
    grade: Schema.Types.StringType().isRequired(`Please enter the student's grade level`)
  });

  const handleSaveEventBtn = async (eventKey, value) => {
    const newStudent = await updateEventScore({
      _id: info._id,
      eventKey,
      value
    })

    if(newStudent) dispatch({type: "INIT", payload: {value: newStudent}})
    
  }

  const handleRemoveEventBtn = async (id) => {
    if(!confirm('Are you sure you want to delete this event?')) return; 
    const value = await removeEvent({studentId: info._id, eventId: id})
    if(value) dispatch({type: "INIT", payload: {value}})
  }

  const handleAddEventBtn = async () => {
    // check if event is already in list

    const isExist = info.events.some((i) => i.value == newEvent)

    if(newEvent == 'math' && newEventMath == "") return notify({
      message: `Please select a math grade.`,
      type: "warning"
    })
    
    if(isExist) return notify({
      message: `Student is already participating in ${findEventValue(newEvent)}.`,
      type: "warning"
    })

    const value = await addEvent({studentId: info._id, event: newEvent, mathEvent: newEventMath})
    if(value) dispatch({type:"INIT", payload: {value}})
  }

  return <DashboardLayout>
    <div className="container">
      <Breadcrumb separator=">">
        <Breadcrumb.Item as={NavLink} href="/dashboard">
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item as={NavLink} href="/dashboard/students">
          Students
        </Breadcrumb.Item>
        <Breadcrumb.Item as={NavLink} href={`/dashboard/students/${info._id}`} active>
          ({ info.fullName })
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col lg={6} sm={12}>
          <h1>Student Information</h1>
        </Col>
        <Col lg={6} sm={12}>
          <div className="controls">
            <ButtonToolbar>
              <Button color="red" size="sm" onClick={handleDeleteStudent} appearance="link" startIcon={<TrashIcon/>}>Delete</Button>
              <Button color="blue" size="sm" onClick={() => {window.print();}} appearance="ghost" startIcon={<PageIcon/>}>Print Page</Button>
            </ButtonToolbar>
          </div>
        </Col>
      </Row>
      
      <br/>
      <Panel bordered>
        <Form
          formValue={formData}
          onChange={(value, e) => handleFormChange(value, e)}
          fluid
          ref={infoFormRef}
          model={model}
        >
          <Row>
            <Col sm="12" lg="4">
              <Form.Group controlId="fullName">
                <Form.ControlLabel>Full Name</Form.ControlLabel>
                {
                  toggleEditInfo ? 
                    <Form.Control name="fullName"/>
                  :
                    <strong style={{lineHeight: "38px"}}>{info.fullName}</strong>
                }
              </Form.Group>
            </Col>
            <Col sm="12" lg="4">
              <Form.Group controlId="church">
                <Form.ControlLabel>Church</Form.ControlLabel>
                {
                  toggleEditInfo ? 
                    <Form.Control name="church"/>
                  :
                    <strong style={{lineHeight: "38px"}}>{info.church}</strong>
                }
              </Form.Group>
            </Col>
            <Col sm="12" lg="2">
              <Form.Group controlId="gender">
                <Form.ControlLabel>Gender</Form.ControlLabel>
                {
                  toggleEditInfo ? 
                    <Form.Control name="gender" accepter={RadioGroup} inline>
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                    </Form.Control>
                  :
                    <strong style={{lineHeight: "38px", textTransform: "capitalize"}}>{info.gender}</strong>
                }
              </Form.Group>
            </Col>
            <Col sm="12" lg="2">
              <Form.Group controlId="grade">
                <Form.ControlLabel>Grade</Form.ControlLabel>

                {
                  toggleEditInfo ? 
                    <Form.Control name="grade" accepter={InputPicker} data={grades} block/>
                  :
                    <strong style={{lineHeight: "38px"}}>{info.grade}</strong>
                }
                
              </Form.Group>
            </Col>
          </Row>
          <Divider/>
          <ButtonToolbar>
            {
              toggleEditInfo ?
              <>
                <Button appearance="primary" onClick={_handleUpdateInfoBtn} startIcon={<CheckIcon/>}>Save Changes</Button>
                <Button appearance="subtle" onClick={() => dispatch({type: "CANCEL_EDIT_INFO"})}>Cancel</Button>
              </>
              : 
                <Button appearance="default"  onClick={() => dispatch({type: "TOGGLE_EDIT_INFO"})} startIcon={<EditIcon/>}>Edit Info</Button>
            }
            
          </ButtonToolbar>
        </Form>
      </Panel>

      <br/>

      <Row>
        <Col lg={6} sm={12}>
          <h3>Events</h3>
        </Col>
        <Col lg={6} sm={12}>
          <div className="controls">
            <Stack spacing={6}>
              <SelectPicker label="Event" data={eventOptions()} onChange={(value) => dispatch({type: "NEW_EVENT_FORM", payload: {value}})} groupBy="role" name="newEvent" value={newEvent} size="sm"/>
              {
                newEvent == 'math' ? <InputPicker block placeholder="Grade" data={grades} onChange={(value) => dispatch({type: "NEW_EVENT_MATH_GRADE", payload: {value}})} style={{ width: 100, height: "auto" }} size="sm" /> : null
              }
              <Button disabled={newEvent == ""} onClick={() => handleAddEventBtn()} size="sm" appearance="ghost" startIcon={<PlusIcon/>}>Add</Button>
            </Stack>
          </div>
        </Col>
      </Row>

      <br/>

      <Panel bordered bodyFill>
        <Table
          height={420}
          data={info.events}
          onSortColumn={(sortColumn, sortType) => {
            console.log(sortColumn, sortType);
          }}
        >
          <Column flexGrow={1}>
            <HeaderCell>Event</HeaderCell>
            <Cell>
              {row => {
                return <>{findEventValue(row.value)} {row.value == 'math' ? `Grade ${info.mathGrade}` : ''}</>
              }}
            </Cell>
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Score</HeaderCell>
            <Cell style={{ padding: '6px', display: 'flex', alignItems: 'center'}}>
              {row => row.isEdit ? 
                <InputNumber size="md" postfix="%" value={row.formValue} onChange={(e) => dispatch({type: "EDIT_EVENT_SCORE", payload: {id: row._id, value: e}})} width={200} min={0} max={100}/>
                :
                <span>{row.totalPoints}</span>
              }
            </Cell>
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Actions</HeaderCell>
            <Cell style={{ padding: '6px' }}>
              {(row, key) => {
                return <ButtonToolbar>
                  {
                    row.isEdit ? 
                      <>
                        <Button size="sm" color="green" appearance="link" onClick={() => handleSaveEventBtn(key, row.formValue)}>
                          Save
                        </Button>
                        <Button size="sm" appearance="link" onClick={() => dispatch({type: "TOGGLE_EDIT_EVENT", payload: {id: row._id}})}>
                          Cancel
                        </Button>
                      </>
                    :
                      <>
                        <Button size="sm" color="blue" appearance="link" onClick={() => dispatch({type: "TOGGLE_EDIT_EVENT", payload: {id: row._id}})}>
                          Edit
                        </Button>
                        <Button size="sm" color="red" appearance="link" onClick={() => handleRemoveEventBtn(row._id)}>Remove</Button>
                      </>
                    
                  }
                  
                  
                </ButtonToolbar>
              }}
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
    <Link href={href} as={as} ref={ref} {...rest}/>
  );
});

export default function StudentHOC(){
  return <StudentProvider>
    <StudentPage/>
  </StudentProvider>
};