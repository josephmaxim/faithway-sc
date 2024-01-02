import Link from 'next/link';

const MainFooter = () => {
  return <div className="main-footer">
    <div className="container">
      <div className="credits">
        <div>Christian Student Convention 2024 | <Link href="https://faithway.org" target="_blank">FaithWay.org</Link></div>
        <div className="maker">Site by <Link href="https://josephmaxim.com" target="_blank">Joseph Maxim</Link></div>
      </div>
    </div>
  </div>
}

export default MainFooter;