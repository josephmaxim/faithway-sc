import MainLayout from "./MainLayout";
import GuidelinesNav from "../Nav/GuidelinesNav";

const GuidelinesLayout = (props) => {

  return <MainLayout
    head={props.head}
  >
    <div className="guidelines-layout">
      <div className="container">
        <div className="content-nav">
          <GuidelinesNav/>
        </div>
        <div className="content-wrapper">
          {props.children}
        </div>
      </div>
    </div>
  </MainLayout>
}

export default GuidelinesLayout;