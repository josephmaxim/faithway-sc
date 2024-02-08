import MainLayout from "./MainLayout";

const AuthLayout = (props) => {

  return <MainLayout>
    <div className="auth-layout">
      { props.children }
    </div>
  </MainLayout>
}

export default AuthLayout;