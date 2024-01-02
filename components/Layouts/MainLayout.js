import Link from 'next/link';

import MainFooter from '@/components/Footers/MainFooter';

const MainLayout = (props) => {

  return <main className="main-layout">
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <h1>Christian Student Convention</h1>
          <h2>{ props.header }</h2>
        </div>
      </div>
    </div>
    <div className="content">
      {props.children}
    </div>
    <MainFooter/>
  </main>
}

export default MainLayout;