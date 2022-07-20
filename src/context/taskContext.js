import { createContext, useReducer, useState } from "react";
import { taskReducer } from "../reducer/taskReducer";
import axios from "axios";
import { apiUrl } from "../config/connectServer";

export const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
  //* State
  const [showFormCreateTask, setShowFormCreateTask] = useState(false);
  const [showFormUpdateTask, setShowFormUpdateTask] = useState(false);
  const [taskState, dispatch] = useReducer(taskReducer, {
    task: null,
    tasks: [],
    tasksLoading: true,
  });

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  //* Lấy tất cả bài viết
  const handleGetAllTasks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/all`);
      if (response.data.success) {
        dispatch({ type: "LOAD_SUCCESS", payload: response.data.results });
      }
    } catch (error) {
      dispatch({ type: "LOAD_FAILED" });
    }
  };

  //* Thêm bài viết mới
  const handleCreateNewTask = async (newTask) => {
    try {
      const response = await axios.post(`${apiUrl}/create_task`, newTask);
      if (response.data.success) {
        dispatch({ type: "ADD_TASK", payload: response.data.value });
        return response.data;
      }
    } catch (error) {
      setShowToast({
        show: true,
        message: "Thêm công việc cần làm đã xảy ra lỗi",
        type: "danger",
      });
    }
  };

  //* Tìm kiếm bài viết khi người dùng chuẩn bị cập nhật
  const findTask = (taskId) => {
    const task = taskState.tasks.find((task) => task.id === taskId);
    dispatch({ type: "FIND_TASK", payload: task });
  };

  //* Cập nhật bài viết
  const handleUpdateOldTask = async (updateTask) => {
    try {
      const response = await axios.put(
        `${apiUrl}/update_task/${updateTask.id}`,
        updateTask,
      );
      if (response.data.success) {
        dispatch({ type: "UPDATE_TASK", payload: response.data.result });
        return response.data;
      }
    } catch (error) {
      setShowToast({
        show: true,
        message: "Cập nhật công việc cần làm đã xảy ra lỗi",
        type: "danger",
      });
    }
  };

  //* Xóa bái viết
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`${apiUrl}/task/${taskId}`);
      if (response.data.success)
        dispatch({ type: "DELETE_TASK", payload: taskId });
    } catch (error) {
      setShowToast({
        show: true,
        message: "Xóa công việc cần làm đã xảy ra lỗi",
        type: "danger",
      });
    }
  };

  const taskContextData = {
    handleGetAllTasks,
    taskState,
    showFormCreateTask,
    setShowFormCreateTask,
    showToast,
    setShowToast,
    handleCreateNewTask,
    findTask,
    showFormUpdateTask,
    setShowFormUpdateTask,
    handleUpdateOldTask,
    handleDeleteTask,
  };
  return (
    <TaskContext.Provider value={taskContextData}>
      {children}
    </TaskContext.Provider>
  );
};
export default TaskContextProvider;
