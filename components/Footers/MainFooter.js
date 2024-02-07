import Link from 'next/link';
import { Container, Row, Col } from 'reactstrap';
import FaithWayLogo from '../Vectors/FaithWayLogo';
import MainLightLogo from '../Vectors/MainLightLogo';

const MainFooter = () => {
  return <div className="main-footer">
    <Container>
      <Row>
        <Col lg="4"  className="order-2 order-lg-1">
          <div className="credits">
            <div className="logo">
              <Link href="/#">
                <FaithWayLogo/>
              </Link>
              <Link href="/#">
                <MainLightLogo/>
              </Link>
            </div>
            <div className="text">
              © 2024 Christian Student Convention.<br/> All rights reserved. Managed by <a target="_blank" href="https://plasmacreative.com">PlasmaCreative</a>
            </div>
          </div>
        </Col>
        <Col className="footer-links order-1 order-lg-2">
          <Row>
            <Col sm="1" lg="4">
              <div className="link-headings">Get Started</div>
              <ul>
                <li><Link href="/">Student Registration</Link></li>
                <li><Link href="/billeting">Billeting Application</Link></li>
                <li><Link href="mailto:dlindhorst@faithway.org">Contact</Link></li>
              </ul>
            </Col>
            <Col sm="1" lg="4">
              <div className="link-headings">Resources</div>
              <ul>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/guidelines">Student Guidelines</Link></li>
              </ul>
            </Col>
            <Col sm="1" lg="4">
              <div className="link-headings">Other Links</div>
              <ul>
                <li><Link href="/login">Login</Link></li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </div>
}

export default MainFooter;