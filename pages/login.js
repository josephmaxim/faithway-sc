import { useState, useRef, useEffect } from 'react';
import Router from "next/router"
import { useSearchParams } from 'next/navigation'
import AuthLayout from "@/components/Layouts/AuthLayout";
import { Form, Button, Panel, Schema, Stack, Divider } from 'rsuite';
import { loginUser } from "@/controller/user";
import { getUser } from '@/controller/user'

const LoginPage = () => {

  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const formRef = useRef();
  const initialState = { email: "", password: "" }
  const [ credentials, setCredentials ] = useState(initialState)

  useEffect(() => {
    async function init(){
      const res = await getUser()
      if(res?.email) Router.replace('/dashboard')
    }
    init();
  },[])

  const submitForm = async () => {
    if (!formRef.current.check()) return;

    // TODO: user login
    const res = await loginUser(credentials)

    if(res == 200) Router.push(redirect ? decodeURI(redirect) : `/dashboard`)
  }

  let model = Schema.Model({
    email: Schema.Types.StringType().isRequired('Enter your username'),
    password: Schema.Types.StringType().isRequired('Enter your password')
  })

  return <AuthLayout>
    <div className="container">
      
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Panel bordered style={{ background: '#fff', width: 400 }} header={<h3>Log In</h3>}>
        <Form 
          fluid
          model={model}
          ref={formRef}
          formValue={credentials}
          onChange={formValue => setCredentials(formValue)}
          onSubmit={submitForm}
        >
          <Form.Group controlId="email">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name="email" />
          </Form.Group>
          <Form.Group controlId="church">
            <Form.ControlLabel>password</Form.ControlLabel>
            <Form.Control name="password" type="password" />
          </Form.Group>
          <Form.Group>
            <Stack spacing={6} divider={<Divider vertical />}>
              <Button appearance="primary" type="submit">Sign in</Button>
            </Stack>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
    </div>
  </AuthLayout>
}

export default LoginPage;