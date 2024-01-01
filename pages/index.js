import { useContext, Fragment, useRef } from 'react';
import RegistrationProvider, {RegistrationContext} from '../context/RegistrationContext';
import Grid from 'rsuite/Grid';
import Row from 'rsuite/Row';
import Col from 'rsuite/Col';
import Divider from 'rsuite/Divider';
import {
  Form,
  Button,
  ButtonToolbar,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Slider,
  DatePicker,
  DateRangePicker,
  CheckPicker,
  SelectPicker,
  TagPicker,
  InputPicker,
  Cascader,
  MultiCascader,
  Rate,
  Uploader,
  Schema,
  Panel,
  Modal,
  List,
  TagGroup,
  Tag,
  Notification, 
  useToaster
} from 'rsuite';
import MainLayout from '../components/Layouts/MainLayout';
import { grades } from '../utils/InputData'; 
import events from '@/utils/events';

const HomePage = () => {

  const toaster = useToaster();
  const formRef = useRef();
  const { regState, regDispatch } = useContext(RegistrationContext)
  const { formValue, togglePreview } = regState;
  const selectedEvents = [...formValue.academics, ...formValue.arts, ...formValue.athletics, ...formValue.speech, ...formValue.vocal, ...formValue.instrumental];
  const countedSelectedEvents = selectedEvents.flatMap((i) => getCategory(i) != 'arts' ? i :[])

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
        return <Col key={key} lg={8} xs={24}>
          <Form.Group controlId={col}>
            <Form.ControlLabel>{col[0].toUpperCase() + col.substring(1)}</Form.ControlLabel>
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
      header: "Warning",
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
      message: "A student may only enter a maximum of 9 participation events excluding those events finished before Convention. (Arts category)"
    }), {placement: 'bottomEnd'});

    regDispatch({type: "TOGGLE_PREVIEW"})
  }

  let schemaModel = {
    fullName: Schema.Types.StringType().isRequired('Please enter your name'),
    gender: Schema.Types.StringType().isRequired('Please specify your gender'),
    church: Schema.Types.StringType().isRequired('Please enter your home church'),
    grade: Schema.Types.StringType().isRequired('Please enter your current grade level')
  }

  if(selectedEvents.includes("math")) schemaModel.mathGrade = Schema.Types.StringType().isRequired('Please enter Math grade level')

  const model = Schema.Model(schemaModel);

  return <MainLayout>
    <Form
      ref={formRef}
      formValue={formValue}
      onChange={formValue => handleFormChange(formValue)}
      model={model}
      fluid
    >
      <Grid fluid>
        <Row>
          <Col lg={18} xs={24}>
            <Form.Group controlId="fullName">
              <Form.ControlLabel>Full Name</Form.ControlLabel>
              <Form.Control name="fullName" />
            </Form.Group>
          </Col>
          <Col lg={6} xs={24}>
            <Form.Group controlId="gender">
              <Form.ControlLabel>Gender</Form.ControlLabel>
              <Form.Control name="gender" accepter={RadioGroup} inline>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col lg={18} xs={24}>
            <Form.Group controlId="church">
              <Form.ControlLabel>Church</Form.ControlLabel>
              <Form.Control name="church" />
            </Form.Group>
          </Col>
          <Col lg={6} xs={24}>
            <Form.Group controlId="grade">
              <Form.ControlLabel>Grade</Form.ControlLabel>
              <Form.Control name="grade" accepter={InputPicker} data={grades}/>
            </Form.Group>
          </Col>
        </Row>
      </Grid>
      <Divider />
      <Grid fluid>
        {
          displayFormOptions()
        }
      </Grid>
      <Divider />
      <ButtonToolbar>
        <Button appearance="primary" onClick={handleReviewRegistration}>Review Registration</Button>
        <Button appearance="default">Reset Form</Button>
      </ButtonToolbar>
    </Form>
    <Modal size="lg" backdrop="static" keyboard={false} open={togglePreview} onClose={() => regDispatch({type: "TOGGLE_PREVIEW"})}>
      <Modal.Header>
        <Modal.Title><strong>Review Registration</strong></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <List size="sm">
          <List.Item>Full Name: <strong>{formValue.fullName}</strong></List.Item>
          <List.Item>Gender: <strong>{formValue.gender}</strong></List.Item>
          <List.Item>Church: <strong>{formValue.church}</strong></List.Item>
          <List.Item>Grade Level: <strong>{formValue.grade}</strong></List.Item>
        </List>
        <br/>
        <Panel header="Participation Events" bordered>
          <TagGroup>
            { displayTags() }
          </TagGroup>
        </Panel>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => regDispatch({type: "TOGGLE_PREVIEW"})} appearance="subtle">
          Go Back
        </Button>
        <Button onClick={() => {}} appearance="primary">
          Submit Registration
        </Button>
      </Modal.Footer>
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