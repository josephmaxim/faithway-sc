import Link from 'next/link';

import MainNav from '../Nav/MainNav';
import MainFooter from '@/components/Footers/MainFooter';

const MainLayout = (props) => {

  return <main className="main-layout">
    <MainNav/>
    <div className="container header">
      <h1>{ props.header }</h1>
    </div>
    <div className="content">
      {props.children}
    </div>
    <MainFooter/>
  </main>
}

export default MainLayout;