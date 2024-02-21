import MainLayout from "./MainLayout";

const AuthLayout = (props) => {

  return <MainLayout
    head={props.head}
  >
    <div className="auth-layout">
      { props.children }
    </div>
  </MainLayout>
}

export default AuthLayout;