import React, { useContext } from "react";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/authContext";
import { Redirect } from "react-router-dom";

export default function Main({ children }) {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;
  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated) return <Redirect to="/" />;
  else body = children;

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Quản lý công việc</h1>
          <h4>Thêm những công việc bạn cần làm</h4>
          <Container fluid>
            <Row>
              <Col sm={12} md={12} lg={12} xl={12}>
                {body}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
