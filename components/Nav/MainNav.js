import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import MainLogo from "../Vectors/MainLogo";

import {
  Collapse,
  Navbar, 
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';

const MainNav = () => {

  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const NavLink = (props) => <Link {...props} className={`nav-link${router.pathname == props.href ? ' active' : ""}`}>{props.children}</Link>

  return <div className="main-nav">
      <Navbar
        color="faded"
        // fixed="top"
        expand="md"
        container={false}
        // dark={router.pathname === '/' ? false : true}
        // className={pageScrolled ? "scrolled" : ""}
      >
        <Container>
          <Link href="/" className="navbar-brand"><MainLogo/></Link>
          <NavbarToggler onClick={toggleNavbar} className="toggler" />
          <Collapse isOpen={collapsed} navbar>
              <Nav navbar className="ms-auto">
                <NavItem>
                  <NavLink href="/">
                    Registration
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/guidelines">
                    Student Guidelines
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/billeting">
                    Billeting
                  </NavLink>
                </NavItem>
              </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
}

export default MainNav;