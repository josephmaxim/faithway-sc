import { useContext, useRef } from "react";
import BilletingProvider, {BilletingContext} from "@/context/BilletingContext";
import { notify } from '@/utils/notification';
import MainLayout from "@/components/Layouts/MainLayout";
import { Container, Row, Col } from 'reactstrap';
import Divider from 'rsuite/Divider';
import PlusIcon from '@rsuite/icons/Plus';
import CloseIcon from '@rsuite/icons/Close';
import {
  Form,
  IconButton,
  Button,
  ButtonToolbar,
  Input,
  Schema,
  List
} from 'rsuite';
import { submitBilleting } from '@/controller/billeting';

const BilletingPage = () => {

  const formRef = useRef();
  const { billetState, billetDispatch } = useContext(BilletingContext)
  const { formValue, list, listForm } = billetState

  const handleFormChange = (value) => {
    billetDispatch({type: "SET_FORM", payload: {value: value}})
  }

  const displayItemList = (param) => {

    const listItems = list[param]?.map((i, key) => {
      return <List.Item className={``} size="sm" key={key}>
        <Row>
          <Col xs="11" lg="11">
            <span style={{fontSize: "14px"}}>{i}</span>
          </Col>
          <Col xs="1" lg="1">
            <IconButton 
              size="xs" 
              color="red" 
              appearance="ghost" 
              icon={<CloseIcon />} 
              style={{float: "right"}}
              circle
              onClick={() => billetDispatch({
                type: "REMOVE_ITEM",
                payload: {
                  param,
                  id: key
                }
              })}
            />
          </Col>
        </Row>
      </List.Item>
    })

    const handleAddItem = (e) => {
      if (e.key === 'Enter') {
        billetDispatch({type: "ADD_ITEM", payload: {param}})
      }
    }

    return <>
      {
        listItems?.length > 0 ? 
          <List bordered>{listItems}</List> 
        : null
      }
      <Row style={{marginTop: "15px"}}>
        <Col sm="12" lg="10">
          <Input
            placeholder="Enter a name..."
            value={listForm[param]}
            onChange={(val) => billetDispatch({
              type: "SET_ITEM_FORM",
              payload: {
                value: val,
                param
              }
            })}
            onKeyDown={(e) => handleAddItem(e)}
          />
        </Col>
        <Col sm="12" lg="2" className="add-item-btn">
          <Button 
            startIcon={<PlusIcon />} 
            appearance="default"
            style={{width: "100%"}}
            disabled={listForm[param] == ""}
            onClick={() => handleAddItem({key: 'Enter'})}
          > 
            Add
          </Button>
        </Col>
      </Row>
    </>
  }

  const model = Schema.Model({
    church: Schema.Types.StringType().isRequired('Please enter your attending church'),
    primaryContact: Schema.Types.StringType().isRequired('Please enter a contact person'),
    phone: Schema.Types.NumberType().isRequired('Please enter a phone number'),
    email: Schema.Types.StringType().isRequired().isEmail('Please enter a valid email address.')
  });

  const handleFormSubmit = async () => {

    if(!formRef.current.check()) return notify({
      type:"danger",
      message: "Please fill out the required fields."
    });

    if(list.sponsors.length == 0) return notify({
      type:"danger",
      message: "Please enter a minimum of 1 sponsor"
    });

    // TODO: handle form submit
   
    const res = await submitBilleting({...formValue, list});
    console.log("Hello", res)

    // billetDispatch({type: "RESET_FORM"})
  }

  return <MainLayout
    header="Billeting Form"
  >
    <Form
      ref={formRef}
      formValue={formValue}
      onChange={formValue => handleFormChange(formValue)}
      model={model}
      fluid
    >

      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Form.Group controlId="church">
              <Form.ControlLabel>Church</Form.ControlLabel>
              <Form.Control name="church" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm="12" lg="8">
            <Form.Group controlId="primaryContact">
              <Form.ControlLabel>Primary Contact Person</Form.ControlLabel>
              <Form.Control name="primaryContact" />
            </Form.Group>
          </Col>
          <Col sm="12" lg="4">
            <Form.Group controlId="phone">
              <Form.ControlLabel>Phone Number</Form.ControlLabel>
              <Form.Control name="phone" />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    <div className="container">
      <p><strong>STUDENTS SHOULD HAVE A SPONSOR BILLET WITH THEM. Please do not leave students on their own at billets or in the dorm.</strong><br/>Please list only those students and sponsors who will need billeting.<br/><u>ALL STUDENTS MUST BRING THEIR OWN SLEEPING BAG & PILLOW. SPONSORS WILL BE OFFERED A BED.</u></p>
    </div>
    <br/>
    <div className="container">
      <h6>Female Students ({list.female.length})</h6>
      { displayItemList("female") }
      <br/>
      <br/>
      <h6>Male Students ({list.male.length})</h6>
      { displayItemList("male") }
      <br/>
      <br/>
      <h6>Sponsors ({list.sponsors.length})</h6>
      { displayItemList("sponsors") }
      <Divider/>

      <Form.Group controlId="email">
        <Form.ControlLabel>Email</Form.ControlLabel>
        <Form.Control name="email" placeholder="youremail@site.com"/>
        <Form.HelpText>We will send you a confirmation email.</Form.HelpText>
      </Form.Group>

      <br/>
      <br/>
      <ButtonToolbar>
        <Button appearance="primary" onClick={handleFormSubmit}>Submit Form</Button>
        <Button 
          appearance="default" 
          onClick={() => confirm("Are you sure you want to reset the form?") ? 
            billetDispatch({type: "RESET_FORM"}) : null
          }
        >
          Reset Form
        </Button>
      </ButtonToolbar>
    </div>

    </Form>
  </MainLayout>
}

export default function BilletingPageHOC(){
  return <BilletingProvider>
    <BilletingPage/>
  </BilletingProvider>
};