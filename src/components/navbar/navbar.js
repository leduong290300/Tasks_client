import React, { useContext, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { FilterContext } from "../../context/filterContext";

import "./navbar.css";
import logoutIcon from "../../assets/icons/logout.svg";
import searchIcon from "../../assets/icons/icons8-search.svg";

export default function NavBar() {
  //* Get Context
  const {
    authState: {
      user: { firstName, lastName },
    },
    handleLogout,
  } = useContext(AuthContext);

  const { handleFilterBySearch } = useContext(FilterContext);

  //* State
  const [search, setSearch] = useState("");

  //* Action
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    handleFilterBySearch(e.target.value);
  };

  return (
    <Navbar bg="black" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="align-items-center justify-content-between"
        >
          <Nav className="mr-auto ">
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/"
              as={Link}
            >
              Trang chủ
            </Nav.Link>

            <Nav.Link
              className="font-weight-bolder text-white"
              to="/about"
              as={Link}
            >
              Thông tin
            </Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Tìm kiếm..."
              className="me-2"
              name="search"
              value={search}
              onChange={onChangeSearch}
            />
            <Button variant="outline-success text-white">
              <img
                src={searchIcon}
                alt="searchIcon"
                width="30"
                height="30"
                className="mr-2"
              />
            </Button>
          </Form>

          <Nav className="align-items-center">
            <Nav.Link className="font-weight-bolder text-white" disabled>
              Xin chào {firstName + " " + lastName}
            </Nav.Link>
            <Button
              variant="secondary"
              className="font-weight-bolder "
              size="sm"
              onClick={() => handleLogout()}
            >
              <img
                src={logoutIcon}
                alt="logoutIcon"
                width="30"
                height="30"
                className="mr-2"
              />
              Đăng xuất
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
