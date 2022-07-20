export const taskReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOAD_SUCCESS":
      return {
        ...state,
        tasks: payload,
        tasksLoading: false,
      };

    case "LOAD_FAILED":
      return {
        ...state,
        tasks: [],
        tasksLoading: false,
      };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, payload],
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload),
      };

    case "FIND_TASK":
      return {
        ...state,
        task: payload,
      };

    case "UPDATE_TASK":
      const newTasks = state.tasks.map((task) =>
        task.id === payload.id ? payload : task,
      );

      return {
        ...state,
        tasks: newTasks,
      };

    default:
      return state;
  }
};
