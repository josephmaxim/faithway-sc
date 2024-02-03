import { useState } from "react";
import Link from 'next/link';
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

  const [collapsed, setCollapsed] = useState(false);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const NavLink = (props) => <Link {...props} className="nav-link">{props.children}</Link>

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
              <hr/>
              <Nav navbar className="ms-auto">
                <NavItem>
                  <NavLink href="/">
                    Registration
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/billeting">
                    Billeting Form
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/guidelines">
                    Student Guidelines
                  </NavLink>
                </NavItem>
              </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>

  return <div className="main-nav">
    <div className="container">
      <Navbar color="faded" light container={false}>
        <NavbarBrand>
          <MainLogo/>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="toggler" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/">
                Student Registration
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/billeting">
                Billeting Form
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/guidelines">
                General Student Guidelines
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  </div>
}

export default MainNav;