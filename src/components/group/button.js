import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import editIcon from "../../assets/icons/pencil.svg";
import deleteIcon from "../../assets/icons/trash.svg";
import { TaskContext } from "../../context/taskContext";

export default function GroupButtons({ id }) {
  //* Context
  const { findTask, setShowFormUpdateTask, handleDeleteTask } =
    useContext(TaskContext);

  //*Action
  const selectTask = (taskId) => {
    findTask(taskId);
    setShowFormUpdateTask(true);
  };

  return (
    <>
      <Button className="post-button" onClick={selectTask.bind(this, id)}>
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      <Button className="post-button" onClick={handleDeleteTask.bind(this, id)}>
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
}
