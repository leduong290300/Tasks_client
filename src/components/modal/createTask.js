import React, { useState, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { TaskContext } from "../../context/taskContext";

export default function CreateTask() {
  //* State
  const [newTask, setNewTask] = useState({
    title: "",
    content: "",
    status: "Bắt đầu thực hiện",
  });
  const { title, content } = newTask;

  //* Lăng nghe sự thay đỏi từ form
  const onChangeCreateForm = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  //* Context
  const {
    showFormCreateTask,
    setShowToast,
    handleCreateNewTask,
    setShowFormCreateTask,
  } = useContext(TaskContext);

  //* Action
  const resetAddPostData = () => {
    setNewTask({
      title: "",
      content: "",

      status: "Bắt đầu thực hiện",
    });
    setShowFormCreateTask(false);
  };

  const closeDialog = () => {
    resetAddPostData();
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setShowToast({
        show: true,
        message: "Tiêu đề và nội dung không được để trống",
        type: "danger",
      });
      return;
    }
    const { success, message } = await handleCreateNewTask(newTask);

    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
    resetAddPostData();
  };
  return (
    <Modal show={showFormCreateTask} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm công việc cần làm</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleCreateTask}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label className="text-black">Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={onChangeCreateForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-black">Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={content}
              onChange={onChangeCreateForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Hủy</Button>
          <Button variant="primary" type="submit">
            Thêm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
