import { useContext, forwardRef } from "react";
import Link from 'next/link';
import StudentProvider, { StudentContext } from "@/context/StudentContext";
import { Table, Breadcrumb, Panel, IconButton, TagGroup, Tag, Pagination, Form, Button, InputPicker, Input, TagPicker, CheckPicker, SelectPicker, ButtonToolbar, Textarea, RadioGroup, Radio, Divider } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
import { Col, Row } from 'reactstrap';

import { grades } from "@/utils/InputData";
import DashboardLayout from "@/components/Layouts/DashboardLayout";

const StudentPage = () => {

  const { state, dispatch } = useContext(StudentContext)
  const { info, formData, toggleEditInfo } = state;

  const handleFormChange = (value, e) => {
    dispatch({type: "FORM_CHANGE", payload: {value}})
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
              <Button onClick={() => {window.print();}} appearance="default">Print</Button>
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
        >
          <Row>
            <Col sm="12" lg="4">
              <Form.Group controlId="name-1">
                <Form.ControlLabel>Username</Form.ControlLabel>
                {
                  toggleEditInfo ? 
                    <Form.Control name="fullName"/>
                  :
                    <strong style={{lineHeight: "38px"}}>{info.fullName}</strong>
                }
              </Form.Group>
            </Col>
            <Col sm="12" lg="4">
              <Form.Group controlId="name-1">
                <Form.ControlLabel>Username</Form.ControlLabel>
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
                <Button appearance="primary" onClick={() => dispatch({type: ""})}>Save Changes</Button>
                <Button appearance="subtle" onClick={() => dispatch({type: "CANCEL_EDIT_INFO"})}>Cancel</Button>
              </>
              : 
                <Button appearance="default"  onClick={() => dispatch({type: "TOGGLE_EDIT_INFO"})}>Edit Info</Button>
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