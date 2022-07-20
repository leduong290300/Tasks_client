import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login.css";
import ToastNotif from "../../../components/toast/toast";
import { AuthContext } from "../../../context/authContext";
export default function Login() {
  //* State
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [showToats, setShowToats] = useState(false);
  const [messageToats, setMessageToats] = useState("");
  const regaxEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //* Get Context
  const { handleLoginAccount } = useContext(AuthContext);

  //* Get state
  const { email, password } = login;

  //* Lắng nghe sự thay đổi ở form login
  const changeLogin = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  //* Hành động
  const onCloseToats = () => setShowToats(false);

  //* Xử lí đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    //* Nếu không có email và password
    if (!email || !password) {
      setShowToats(true);
      setMessageToats("Email và mật khẩu không được để trống");
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
    if (password.length <= 6) {
      setShowToats(true);
      setMessageToats("Mật khẩu không được ít hơn 6 kỹ tự");
      setTimeout(() => {
        setShowToats(false);
        setMessageToats("");
      }, 2000);
      return;
    }

    try {
      const data = await handleLoginAccount(login);
      if (!data.success) {
        setShowToats(true);
        setMessageToats(data.message);
        setTimeout(() => {
          setShowToats(false);
          setMessageToats("");
        }, 2000);
        return;
      }
    } catch (error) {
      setShowToats(true);
      setMessageToats(error);
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
      <Form className="mt-3" onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label className="text-white d-flex justify-content-start">
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="example@gmail.com"
            name="email"
            value={email}
            onChange={changeLogin}
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
            onChange={changeLogin}
          />
        </Form.Group>
        <div className="action mb-3">
          <div className="action_check">
            <Form.Group>
              <Form.Check
                className="text-white "
                type="checkbox"
                label="Ghi nhớ đăng nhập"
              />
            </Form.Group>
          </div>
          <div className="action_link">
            <Link to="/register">
              <span className="register">Đăng ký</span>
            </Link>
            <Link to="/forgot_password">
              <span className="forgot">Quên mật khẩu?</span>
            </Link>
          </div>
        </div>
        <Button variant="primary" type="submit">
          Đăng nhập
        </Button>
      </Form>
    </>
  );
}
