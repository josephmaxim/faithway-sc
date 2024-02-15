import { useContext, forwardRef, useRef } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import StudentProvider, { StudentContext } from "@/context/StudentContext";
import { Table, Breadcrumb, Panel, IconButton, TagGroup, Tag, Pagination, Form, Button, InputPicker, Input, TagPicker, CheckPicker, SelectPicker, ButtonToolbar, Schema, RadioGroup, Radio, Divider } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
import { Col, Row } from 'reactstrap';

import { grades } from "@/utils/InputData";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { updateStudentInfo, deleteStudent } from '@/controller/student';

import PageIcon from '@rsuite/icons/Page';
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import CheckIcon from '@rsuite/icons/Check';

const StudentPage = () => {

  const infoFormRef = useRef();
  const router = useRouter();
  const { state, dispatch } = useContext(StudentContext)
  const { info, formData, toggleEditInfo } = state;

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
              <Button color="red" onClick={handleDeleteStudent} appearance="ghost" startIcon={<TrashIcon/>}>Delete</Button>
              <Button color="blue" onClick={() => {window.print();}} appearance="ghost" startIcon={<PageIcon/>}>Print Page</Button>
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