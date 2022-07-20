import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import ToastNotif from "../../../components/toast/toast";

export default function ForgotPassword() {
  //* State
  const [forgot, setForgot] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showToats, setShowToats] = useState(false);
  const [messageToats, setMessageToats] = useState("");
  const regaxEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //* Get state
  const { email, password, confirmPassword } = forgot;

  //* Lắng nghe sự thay đổi ở form login
  const changeForgot = (event) => {
    setForgot({ ...forgot, [event.target.name]: event.target.value });
  };

  //* Hành động
  const onCloseToats = () => setShowToats(false);

  //* Xử lí cấp lại mật khẩu
  const handleForgotPassword = (e) => {
    e.preventDefault();
    //* Nếu không có email và password
    if (!email || !password || !confirmPassword) {
      setShowToats(true);
      setMessageToats("Các trường không được để trống");
      setTimeout(() => {
        setShowToats(false);
        setMessageToats("");
      }, 2000);
      return;
    }

    //* Nếu email không hợp lệ
    if (!regaxEmail.test(email)) {
      setShowToats(true);
      setMessageToats("Email không hợp lệ");
      setTimeout(() => {
        setShowToats(false);
        setMessageToats("");
      }, 2000);
      return;
    }

    //* Nếu mật khẩu ít hơn 6 ký tự
    if (password.length <= 6 || confirmPassword.length <= 6) {
      setShowToats(true);
      setMessageToats("Mật khẩu không được ít hơn 6 kỹ tự");
      setTimeout(() => {
        setShowToats(false);
        setMessageToats("");
      }, 2000);
      return;
    }

    //* Nếu mật khẩu nhập lại không khớp
    if (confirmPassword != password) {
      setShowToats(true);
      setMessageToats("Mật khẩu nhập lại không đúng");
      setTimeout(() => {
        setShowToats(false);
        setMessageToats("");
      }, 2000);
      return;
    }
  };

  return (
    <>
      <ToastNotif
        showToats={showToats}
        messageToats={messageToats}
        onCloseToats={onCloseToats}
      />
      <Form className="mt-3" onSubmit={handleForgotPassword}>
        <Form.Group className="mb-3">
          <Form.Label className="text-white d-flex justify-content-start">
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="example@gmail.com"
            name="email"
            value={email}
            onChange={changeForgot}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-white d-flex justify-content-start">
            Mật khẩu
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            name="password"
            value={password}
            onChange={changeForgot}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-white d-flex justify-content-start">
            Nhập lại mật khẩu
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            name="confirmPassword"
            value={confirmPassword}
            onChange={changeForgot}
          />
        </Form.Group>
        <div className="action mb-3">
          <div className="action_check">
            <Button variant="primary" type="submit">
              Cập nhật mật khẩu
            </Button>
          </div>
          <div className="action_link">
            <Link to="/login">
              <span className="login">Đăng nhập?</span>
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
}
