import React, { useContext, useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { TaskContext } from "../../context/taskContext";

export default function UpdateTask() {
  //* Context
  const {
    taskState: { task },
    showFormUpdateTask,
    setShowFormUpdateTask,
    setShowToast,
    handleUpdateOldTask,
  } = useContext(TaskContext);

  //* State
  const [updateTask, setUpdateTask] = useState(task);
  const { title, content, status } = updateTask;

  //* Effect
  useEffect(() => setUpdateTask(task), [task]);

  //* Lắng nghe sự thay đổi từ form
  const onChangeUpdateForm = (e) => {
    setUpdateTask({ ...updateTask, [e.target.name]: e.target.value });
  };

  //* Action
  const closeDialog = () => {
    setUpdateTask(task);
    setShowFormUpdateTask(false);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const { success, message } = await handleUpdateOldTask(updateTask);
    setShowFormUpdateTask(false);
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <Modal show={showFormUpdateTask} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa bài viết</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleUpdateTask}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label className="text-black">Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              name="title"
              required
              value={title}
              onChange={onChangeUpdateForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-black">Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={content}
              onChange={onChangeUpdateForm}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-black">Trạng thái</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={status}
              onChange={onChangeUpdateForm}
            >
              <option value="Bắt đầu thực hiện">Bắt đầu thực hiện</option>
              <option value="Đang thực hiện">Đang thực hiện</option>
              <option value="Đã hoàn thành">Đã hoàn thành</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Hủy chỉnh sửa
          </Button>
          <Button variant="primary" type="submit">
            Lưu chỉnh sửa
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
