import { useState } from "react";
import Link from 'next/link';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

const MainNav = () => {

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const NavLink = (props) => <Link {...props} className="nav-link">{props.children}</Link>

  return <div className="main-nav">
    <div className="container">
      <Navbar color="faded" light container={false}>
        <NavbarBrand>
          Christian Student Convention
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
              <NavLink href="/student-guidelines">
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