import { useContext, Fragment, useRef } from 'react';
import Link from 'next/link';
import RegistrationProvider, { RegistrationContext } from '../context/RegistrationContext';
import Divider from 'rsuite/Divider';
import { Container, Row, Col, Table } from 'reactstrap';
import {
  Form,
  Button,
  ButtonToolbar,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  InputPicker,
  Schema,
  Panel,
  Modal,
  TagGroup,
  Tag,
  Notification, 
  useToaster
} from 'rsuite';
import CheckOutlineIcon from '@rsuite/icons/CheckOutline';
import MainLayout from '../components/Layouts/MainLayout';
import { grades } from '../utils/InputData'; 
import events from '@/utils/events';

const HomePage = () => {

  const toaster = useToaster();
  const formRef = useRef();
  const emailRef = useRef();
  const { regState, regDispatch } = useContext(RegistrationContext)
  const { formValue, togglePreview, isSubmitted } = regState;
  const selectedEvents = [...formValue.academics, ...formValue.arts, ...formValue.athletics, ...formValue.speech, ...formValue.vocal, ...formValue.instrumental];
  const countedSelectedEvents = selectedEvents.flatMap((i) => getCategory(i) != 'arts' && isExcludedEvent(i)  ? i :[])

  function isExcludedEvent(ev){
    const excludedEvents = ['essayWriting_a', 'essayWriting_b', 'poetryWriting_a', 'poetryWriting_b','shortStoryWriting_a', 'shortStoryWriting_b'];
    return !excludedEvents.includes(ev)
  }

  const handleFormChange = (value) => {
    regDispatch({type: "SET_FORM", payload: {value: value}})
  }

  const displayTags = () => {
    // const eventList = Object.keys(formValue).reduce((list, i) =>{
    //   const objData = formValue[i];
    //   if(Array.isArray(objData)) return list.concat(objData);
    //   return list;
    // },[])

    return selectedEvents.map((i, key) => {
      const event = findEventValue(i)
      return <Tag key={key} size='lg'>{event} {event == "Math" ? `(Grade ${formValue.mathGrade})`: ""}</Tag>
    });
  }

  const displayFormOptions = () => {
    const form = Object.keys(events).reduce((forms, i, index) => {
      // if(index >= 3) return forms[1][i] = events[i];
      forms[index <= 2 ? 0 : 1][i] = events[i];
      return forms;
    }, [{},{}])

    return form.map((row, key) => {

      const formCol = Object.keys(row).map((col, key) => {

        const checkboxItem = Object.keys(row[col]).map((box, key) => {
          return <Fragment key={key}>
            <Checkbox key={key} value={box}>{row[col][box]}</Checkbox>
            {
              box == "math" && formValue.academics.includes('math') ?
                <Form.Control name="mathGrade" placeholder="Math Grade" accepter={InputPicker} data={grades}/>
              : null
            }
          </Fragment> 
        })
        return <Col key={key} sm="12" lg="4">
          <Form.Group controlId={col}>
            <Form.ControlLabel><div className="option-title">{col[0].toUpperCase() + col.substring(1)}</div></Form.ControlLabel>
            <Form.Control name={col} accepter={CheckboxGroup}>
              { checkboxItem }
            </Form.Control>
          </Form.Group>
        </Col>
      })

      return <Fragment key={key}>
        <Row>
          { formCol }
        </Row>
        <br/>
      </Fragment>
    })
  }

  function findEventValue(key) {
    for (const category in events) {
      if (Object.prototype.hasOwnProperty.call(events[category], key)) {
        return events[category][key];
      }
    }
    return 'Key not found';
  }

  function getCategory(key) {
    for (const category in events) {
      if (Object.prototype.hasOwnProperty.call(events[category], key)) {
        return category;
      }
    }
    return 'Category not found';
  }

  const handleReviewRegistration = () => {
    if (!formRef.current.check()) return toaster.push(notify({
      type:"error",
      header: "Error",
      message: "Please fill out the required fields."
    }), {placement: 'bottomEnd'});

    // Min event Error
    if(selectedEvents.length < 3) return  toaster.push(notify({
      type:"warning",
      header: "Warning",
      message: "A participant must enter a minimum of 3 events."
    }), {placement: 'bottomEnd'});

    // Max event Err.
    if(countedSelectedEvents.length > 9) return  toaster.push(notify({
      type:"error",
      header: "Error",
      message: "A student may enter a maximum of 9 participation events EXCLUDING those events finished before Convention (needlework, sketching, etc.)."
    }), {placement: 'bottomEnd'});

    regDispatch({type: "TOGGLE_PREVIEW"})
  }

  const handleFormReset = () => {
    toaster.push(notify({
      type:"info",
      header: "Form has been reset.",
      // message: "Form has been reset."
    }), {placement: 'bottomEnd'});

    regDispatch({type: "RESET_FORM"})
  }

  let schemaModel = {
    fullName: Schema.Types.StringType().isRequired('Please enter your name'),
    gender: Schema.Types.StringType().isRequired('Please specify your gender'),
    church: Schema.Types.StringType().isRequired('Please enter your home church'),
    grade: Schema.Types.StringType().isRequired('Please enter your current grade level')
  }

  if(selectedEvents.includes("math")) schemaModel.mathGrade = Schema.Types.StringType().isRequired('Please enter Math grade level')

  const model = Schema.Model(schemaModel);

  const handleSubmitRegistration = async () => {
    if (!emailRef.current.check()) return toaster.push(notify({
      type:"error",
      header: "Error",
      message: "Please enter a valid email."
    }), {placement: 'bottomEnd'});

    // TODO: Handle backend call...

    regDispatch({type: "SUBMIT_SUCCESS"})
    console.log(formValue);
  }

  return <MainLayout
    header="Student Registration"
  >
    <div className="container">
      <p>For more information please see <Link href="/student-guidelines">General Student Guidelines</Link></p>
    </div>
    <Form
      ref={formRef}
      formValue={formValue}
      onChange={formValue => handleFormChange(formValue)}
      model={model}
      fluid
    >
      <Container>
        <Row>
          <Col sm="12" lg="9">
            <Form.Group controlId="fullName">
              <Form.ControlLabel>Full Name</Form.ControlLabel>
              <Form.Control name="fullName" />
            </Form.Group>
          </Col>
          <Col sm="12" lg="3">
            <Form.Group controlId="gender">
              <Form.ControlLabel>Gender</Form.ControlLabel>
              <Form.Control name="gender" accepter={RadioGroup} inline>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm="12" lg="9">
            <Form.Group controlId="church">
              <Form.ControlLabel>Church</Form.ControlLabel>
              <Form.Control name="church" />
            </Form.Group>
          </Col>
          <Col sm="12" lg="3">
            <Form.Group controlId="grade">
              <Form.ControlLabel>Grade</Form.ControlLabel>
              <Form.Control name="grade" accepter={InputPicker} data={grades} block/>
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <br/>
      <br/>
      <Container>
        {
          displayFormOptions()
        }
      </Container>

      <Container>
        <Divider />
        <ButtonToolbar>
          <Button appearance="primary" onClick={handleReviewRegistration}>Review Registration</Button>
          <Button appearance="default" onClick={handleFormReset}>Reset Form</Button>
        </ButtonToolbar>
      </Container>
      
    </Form>
    <Modal size="lg" backdrop="static" keyboard={false} open={togglePreview} onClose={() => regDispatch({type: "TOGGLE_PREVIEW"})}>
      <Modal.Header>
        <Modal.Title><strong>Review Registration</strong></Modal.Title>
      </Modal.Header>

      {
        isSubmitted ?
          <>
            <Modal.Body>
              <Panel bordered>
                <br/>
                <br/>
                <center><CheckOutlineIcon color='green' width="4em" height="4em"/></center>
                <br/>
                <center><h4>Thank you for registering for the 2024 Christian Student Convention!</h4></center>
                <center><p>You are all set. You'll receive an email with your registration details.<br/> We look forward to seeing you there!</p></center>
                <br/>
                <br/>
              </Panel>
            </Modal.Body>
            <Modal.Footer>
              <Button 
                onClick={() => {
                  regDispatch({type: "RESET_FORM"});
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                }} 
                appearance="primary"
              >
                Submit Another Student
              </Button>
            </Modal.Footer>
          </>
        :
          <>
            <Modal.Body>
              <Table bordered  size="sm">
                <tbody>
                  <tr><td width={110}>Full Name</td><td><strong>{formValue.fullName}</strong></td></tr>
                  <tr><td>Gender</td><td><strong>{formValue.gender}</strong></td></tr>
                  <tr><td>Church</td><td><strong>{formValue.church}</strong></td></tr>
                  <tr><td>Grade</td><td><strong>{formValue.grade}</strong></td></tr>
                </tbody>
              </Table>
              <Panel header={`Participation Events (${selectedEvents.length})`} bordered>
                <TagGroup>
                  { displayTags() }
                </TagGroup>
              </Panel>
              <br/>
              <Form 
                model={Schema.Model({email: Schema.Types.StringType().isRequired().isEmail('Please enter a valid email address.')})}
                ref={emailRef}
                formValue={formValue}
                onChange={formValue => handleFormChange(formValue)}
                fluid
              >
                <Form.Group controlId="email">
                  <Form.ControlLabel>Email</Form.ControlLabel>
                  <Form.Control name="email" placeholder="youremail@site.com"/>
                  <Form.HelpText>We will send you a registration confirmation and a copy of your registration information.</Form.HelpText>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => regDispatch({type: "TOGGLE_PREVIEW"})} appearance="subtle">
                Go Back
              </Button>
              <Button onClick={() => handleSubmitRegistration()} appearance="primary">
                Submit Registration
              </Button>
            </Modal.Footer>
          </>
      }
      
    </Modal>
  </MainLayout>
}

export default function HomePageHOC(){
  return <RegistrationProvider>
    <HomePage/>
  </RegistrationProvider>
}

const notify = ({ header, message, type }) => (
  <Notification type={type} header={header}>
    { message }
  </Notification>
);