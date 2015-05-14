'use strict';

import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Navbar fixedTop brand="Time Tracking">
        <Nav>
          <NavItem href="#">Jobs</NavItem>
          <NavItem href="#">Invoices</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
