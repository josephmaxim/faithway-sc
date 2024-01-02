import Link from 'next/link';

const MainFooter = () => {
  return <div className="main-footer">
    <div className="container">
      <div className="credits">
        <div>2024 Christian Student Convention</div>
        <div className="maker"><Link href="https://www.faithway.org" target="_blank">www.FaithWay.org</Link></div>
      </div>
    </div>
  </div>
}

export default MainFooter;