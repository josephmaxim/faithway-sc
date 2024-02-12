import { forwardRef, useContext } from "react"; 
import Link from 'next/link';
import BilletProvider, { BilletContext } from '@/context/BilletContext';
import { Table, Breadcrumb, Panel, Tag, Button, ButtonToolbar,
  Modal, Form, Schema, InputPicker, Input, IconButton} from 'rsuite';
import { Row, Col, Container} from 'reactstrap'
const { Column, HeaderCell, Cell } = Table;
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import PageIcon from '@rsuite/icons/Page';
import EditIcon from '@rsuite/icons/Edit';
import CloseIcon from '@rsuite/icons/Close';

const BilletPage = () => {

  const { state, dispatch } = useContext(BilletContext);
  const { info, form, filters, selectedFilters, toggleEdit } = state;

  const filteredPersons = info?.persons?.flatMap(i => selectedFilters.includes(i.type) || selectedFilters.length == 0 ? i : [])

  return <DashboardLayout>
    <div className="container">
      <Breadcrumb separator=">">
        <Breadcrumb.Item as={NavLink} href="/dashboard">
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item as={NavLink} href="/dashboard/billeting">
          Billeting
        </Breadcrumb.Item>
        <Breadcrumb.Item as={NavLink} href={`/dashboard/billeting/${info._id}`} active>
          Billet ({ info.church })
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col lg={6} sm={12}>
          <h1>Billet - {info.church}</h1>
          <p>{info.primaryContact} (+1{info.phone})</p>
        </Col>
        <Col lg={6} sm={12}>
          <div className="controls">
            <ButtonToolbar>
              <Button onClick={() => {window.print();}} appearance="default" startIcon={<PageIcon />}>Print</Button>
              {/* <Button onClick={() => dispatch({type: "TOGGLE_EDIT"})} appearance="default" startIcon={<EditIcon />}>Edit</Button> */}
            </ButtonToolbar>
          </div>
        </Col>
      </Row>
      <br/>
      <ButtonToolbar>
        {
          filters.map((i, key) => <Button 
            size="sm"
            key={key} 
            appearance={selectedFilters.includes(i) || (i == "ALL" && selectedFilters.length == 0) ? 'primary' : 'default'}
            active={selectedFilters.includes(i) || (i == "ALL" && selectedFilters.length == 0)}
            onClick={() => dispatch({type: "ADD_FILTER", payload: {value: i}})}
            >
              {i.toLowerCase()}
            </Button>
          )
        }
        
      </ButtonToolbar>
      <br/>
      <Panel bordered bodyFill>
        <Table
          autoHeight={true}
          data={filteredPersons}
        >
          <Column flexGrow={1}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name"/>
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Gender / Type</HeaderCell>
            <Cell>
              {item => ((() => {
                let color = "orange";
                color = item.type == 'MALE' ? "blue" : color;
                color = item.type == "FEMALE" ? "violet" : color;
                return<Tag color={color}>{item.type.toLowerCase()}</Tag>
              })())}
            </Cell>
          </Column>
        </Table>
      </Panel>
    </div>
    <Modal size="md" backdrop="static" keyboard={false} open={toggleEdit} onClose={() => dispatch({type: "TOGGLE_EDIT"})}>
      <Modal.Header>
        <Modal.Title><strong>Edit Billet Information</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form 
          model={Schema.Model({
            email: Schema.Types.StringType().isRequired().isEmail('Please enter a valid email address.'),
            password: Schema.Types.StringType().isRequired('Please enter the password.')
          })}
          // ref={emailRef}
          formValue={form}
          onChange={value => dispatch({type: "EDIT_FORM", payload: {value}})}
          fluid
        >
          <Form.Group controlId="church">
            <Form.ControlLabel>Church</Form.ControlLabel>
            <Form.Control name="church"/>
          </Form.Group>
          <Row>
            <Col sm="12" lg="6" style={{paddingLeft: "10pxs"}}>
              <Form.Group controlId="primaryContact">
                <Form.ControlLabel>Primary Contact</Form.ControlLabel>
                <Form.Control name="primaryContact"/>
              </Form.Group>
            </Col>
            <Col sm="12" lg="6">
              <Form.Group controlId="phone">
                <Form.ControlLabel>Phone #</Form.ControlLabel>
                <Form.Control name="phone" type="number"/>
              </Form.Group>
            </Col>
          </Row>
          <hr/>
          <Table autoHeight={true} data={form.persons} bordered={false}>
            <Column flexGrow={1}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" style={{padding: "3px 0px 3px 0px"}}>
                {i => (<Input
                  defaultValue={i.name}
                  onChange={event => {}}
                />)}
              </Cell>
            </Column>
            <Column width={150}>
              <HeaderCell>Type</HeaderCell>
              <Cell dataKey="name" style={{padding: "3px 0px 3px 5px"}}>
                {i => (<InputPicker data={[
                  {label: "Sponsor", value: "SPONSOR"},
                  {label: "Male", value: "MALE"},
                  {label: "Female", value: "FEMALE"}
                ]} style={{ width: 450 }} value={i.type} />)}
              </Cell>
            </Column>
            <Column width={42}>
              <HeaderCell></HeaderCell>
              <Cell style={{padding: 8}}>
                <IconButton 
                  size="xs" 
                  color="red" 
                  appearance="ghost" 
                  icon={<CloseIcon />}
                  circle
                  onClick={() => dispatch({
                    type: "REMOVE_ITEM",
                    payload: {
                      param,
                      id: key
                    }
                  })}
                />
              </Cell>
            </Column>
          </Table>
        </Form>
      </Modal.Body>
      <br/>
      <Modal.Footer>
        <Button onClick={() => dispatch({type: "TOGGLE_EDIT"})} appearance="subtle">
          Go Back
        </Button>
        <Button onClick={() => {}} appearance="primary">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  </DashboardLayout>
}

const NavLink = forwardRef((props, ref) => {
  const { href, as, ...rest } = props;
  return (
    <Link href={href} as={as} ref={ref} {...rest}>
    
    </Link>
  );
});

export default function BilletPageHOC(){
  return <BilletProvider>
    <BilletPage/>
  </BilletProvider>
};