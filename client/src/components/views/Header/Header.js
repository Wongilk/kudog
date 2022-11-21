import React from "react";

import Nav from "react-bootstrap/Nav";

const Header = () => {
  return (
    <div>
      <h1 class="text-center mt-5 mb-5 display-3">
        <a class="text-decoration-none text-dark" href="/">
          KUDOG
        </a>
      </h1>
      <Nav className="justify-content-center" activeKey="/">
        <Nav.Item className="m-3">
          <a
            class="nav-link text-dark"
            href="/"
            data-rr-ui-event-key="/homepage"
          >
            HOME
          </a>
        </Nav.Item>
        <Nav.Item className="m-3">
          <a
            class="nav-link text-dark"
            href="/product"
            data-rr-ui-event-key="/product"
          >
            SHOP
          </a>
          {/* <Nav.Link href="/product">SHOP</Nav.Link> */}
        </Nav.Item>
        <Nav.Item className="m-3">
          <a
            class="nav-link text-dark"
            href="/review"
            data-rr-ui-event-key="/review"
          >
            REVIEW
          </a>
        </Nav.Item>
        <Nav.Item className="m-3">
          <a
            class="nav-link text-dark"
            href="/contact"
            data-rr-ui-event-key="/contact"
          >
            CONTACT
          </a>
        </Nav.Item>
      </Nav>
      <hr class="m-5" />
    </div>
  );
};

export default Header;
