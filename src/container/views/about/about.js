import React from "react";
import { Card } from "react-bootstrap";
export default function About() {
  return (
    <Card className="text-center mx-5 my-5">
      <Card.Header as="h3">Ứng dụng quản lý công việc cần làm</Card.Header>
      <Card.Body>
        <Card.Title>Thông tin về app:</Card.Title>
        <Card.Text>Công nghệ sử dụng:</Card.Text>
        <Card.Text>Frontend: React</Card.Text>
        <Card.Text>Backend: ExpressJS(Node)</Card.Text>
        <Card.Text>CSDL: MySQL</Card.Text>
        <Card.Text>Version: 1.0</Card.Text>
      </Card.Body>
    </Card>
  );
}
