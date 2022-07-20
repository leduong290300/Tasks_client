export const filterReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FILTER_STATUS":
      return {
        ...state,
        status: payload,
      };
    case "FILTER_SEARCH":
      return {
        ...state,
        search: payload,
      };
    default:
      return state;
  }
};
