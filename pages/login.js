import { useState, useRef } from 'react';
import Link from 'next/link';
import AuthLayout from "@/components/Layouts/AuthLayout";
import { Form, Button, Panel, Schema, Stack, Divider } from 'rsuite';

const LoginPage = () => {

  const formRef = useRef();
  const initialState = { username: "", password: "" }
  const [ credentials, setCredentials ] = useState(initialState)

  const submitForm = async () => {
    if (!formRef.current.check()) return;

    // TODO: user login
  }

  let model = Schema.Model({
    username: Schema.Types.StringType().isRequired('Enter your username'),
    password: Schema.Types.StringType().isRequired('Enter your password')
  })

  return <AuthLayout>
    <div className="container">
      
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{
        height: '700px'
      }}
    >
      <Panel bordered style={{ background: '#fff', width: 400 }} header={<h3>Log In</h3>}>
        <Form 
          fluid
          model={model}
          ref={formRef}
          formValue={credentials}
          onChange={formValue => setCredentials(formValue)}
        >
          <Form.Group controlId="username">
            <Form.ControlLabel>Username</Form.ControlLabel>
            <Form.Control name="username" />
          </Form.Group>
          <Form.Group controlId="church">
            <Form.ControlLabel>password</Form.ControlLabel>
            <Form.Control name="password" type="password" />
          </Form.Group>
          <Form.Group>
            <Stack spacing={6} divider={<Divider vertical />}>
              <Button appearance="primary" onClick={submitForm}>Sign in</Button>
            </Stack>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
    </div>
  </AuthLayout>
}

export default LoginPage;