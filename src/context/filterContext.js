import { createContext, useReducer } from "react";
import { filterReducer } from "../reducer/filterReducer";

export const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {
  //* State
  const [taskState, dispatch] = useReducer(filterReducer, {
    search: "",
    status: "Tất cả",
  });

  //* Lọc bởi tìm kiếm
  const handleFilterBySearch = (value) => {
    dispatch({ type: "FILTER_SEARCH", payload: value });
  };

  //* Lọc theo trạng thái
  const handleFilterByStatus = (value) => {
    dispatch({ type: "FILTER_STATUS", payload: value });
  };

  const filterContextData = {
    taskState,
    handleFilterByStatus,
    handleFilterBySearch,
  };
  return (
    <FilterContext.Provider value={filterContextData}>
      {children}
    </FilterContext.Provider>
  );
};
export default FilterContextProvider;
