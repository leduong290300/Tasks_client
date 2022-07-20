import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import GroupButtons from "../group/button";

export default function SingleTask({ id, status, title, content }) {
  return (
    <Card
      className="shadow"
      border={
        status === "Đã hoàn thành"
          ? "success"
          : status === "Đang thực hiện"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill
                bg={
                  status === "Đã hoàn thành"
                    ? "success"
                    : status === "Đang thực hiện"
                    ? "warning"
                    : "danger"
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <GroupButtons id={id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
}
