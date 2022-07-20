import React from "react";
import { Toast } from "react-bootstrap";
import AlertIcon from "../../assets/icons/alert.svg";
import "./toats.css";

export default function ToastNotif({ messageToats, showToats, onCloseToats }) {
  return (
    <Toast show={showToats} className="custom_toats" onClose={onCloseToats}>
      <Toast.Header>
        <img src={AlertIcon} className="rounded me-2" alt="alert_icon" />
        <strong className="me-auto">Thông báo</strong>
      </Toast.Header>
      <Toast.Body>{messageToats}!</Toast.Body>
    </Toast>
  );
}
