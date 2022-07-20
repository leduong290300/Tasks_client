import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import { TaskContext } from "../../../context/taskContext";
import { FilterContext } from "../../../context/filterContext";
import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Spinner,
  Toast,
  Tooltip,
} from "react-bootstrap";
import CreateTask from "../../../components/modal/createTask";
import UpdateTask from "../../../components/modal/updateTask";
import SingleTask from "../../../components/task/singleTask";
import addIcon from "../../../assets/icons/plus-circle-fill.svg";

export default function Dashboard() {
  //* State
  const [state, setState] = useState("Tất cả");
  const [searchParam] = useState(["title", "content"]);
  //* Context
  const {
    authState: {
      user: { firstName, lastName },
    },
  } = useContext(AuthContext);

  const {
    taskState: { task, tasks, tasksLoading },
    handleGetAllTasks,
    setShowFormCreateTask,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(TaskContext);

  const {
    taskState: { search, status },
    handleFilterByStatus,
  } = useContext(FilterContext);

  //* Effect
  useEffect(() => {
    handleGetAllTasks();
  }, []);

  //* Action
  const onChangeStatus = (e) => {
    setState(e.target.value);
    handleFilterByStatus(e.target.value);
  };

  //* Lọc theo trạng thái hoặc tìm kiếm
  const filterBySearchOrStatus = (tasks) => {
    return tasks.filter((task) => {
      if (task.status == status) {
        return searchParam.some((newTask) => {
          return (
            task[newTask]
              .toString()
              .toLowerCase()
              .indexOf(search.toLowerCase()) > -1
          );
        });
      } else if (status == "Tất cả") {
        return searchParam.some((newTask) => {
          return (
            task[newTask]
              .toString()
              .toLowerCase()
              .indexOf(search.toLowerCase()) > -1
          );
        });
      }
    });
  };

  let body;
  if (tasksLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (tasks.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h3">
            Xin chào {firstName + " " + lastName}
          </Card.Header>
          <Card.Body>
            <Card.Title>Quản lý công việc</Card.Title>
            <Card.Text>Thêm những việc cần làm ngay</Card.Text>
            <Button
              variant="primary"
              onClick={setShowFormCreateTask.bind(this, true)}
            >
              Thêm mới
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-1">
          <Card className="shadow card-check mb-3">
            <Card.Body>
              <Card.Title>
                <Row>
                  <Col>
                    <p>Lọc bởi trạng thái</p>
                  </Col>
                </Row>
              </Card.Title>
              <Form.Select value={state} onChange={onChangeStatus}>
                <option value="Tất cả">Tất cả</option>
                <option value="Đang thực hiện">Đang thưc hiện</option>
                <option value="Đã hoàn thành">Đã hoàn thành</option>
              </Form.Select>
            </Card.Body>
          </Card>
        </Row>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {filterBySearchOrStatus(tasks).map((task) => (
            <Col key={task.id} className="my-2">
              <SingleTask
                id={task.id}
                status={task.status}
                title={task.title}
                content={task.content}
              />
            </Col>
          ))}
        </Row>
        <OverlayTrigger placement="left" overlay={<Tooltip>Thêm mới</Tooltip>}>
          <Button
            className="btn-floating"
            onClick={setShowFormCreateTask.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }
  return (
    <>
      {body}
      <CreateTask />
      {task !== null && <UpdateTask />}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
}
