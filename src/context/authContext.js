import { authReducer } from "../reducer/authReducer";
import axios from "axios";
import { createContext, useReducer, useEffect } from "react";
import { apiUrl } from "../config/connectServer";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  //*Init data
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  //* Xác thực tài khoản
  const verifyAccount = async () => {
    if (localStorage.getItem("managementTask")) {
      setAuthToken(localStorage.getItem("managementTask"));
    }
    try {
      const response = await axios.get(`${apiUrl}/account`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.account },
        });
      }
    } catch (error) {
      localStorage.removeItem("managementTask");
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  //* Đăng nhập
  const handleLoginAccount = async (value) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, value);
      if (response.data.success) {
        localStorage.setItem("managementTask", response.data.accessToken);
      }
      await verifyAccount();
      return response.data;
    } catch (error) {
      return error;
    }
  };

  //* Đăng kí tài khoản
  const handleRegisterAccount = async (value) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, value);
      if (response.data.success) {
        localStorage.setItem("managementTask", response.data.accessToken);
      }
      await verifyAccount();
      return response.data;
    } catch (error) {
      return error;
    }
  };

  //* Đăng xuất tài khoản
  const handleLogout = async () => {
    localStorage.removeItem("managementTask");
    setAuthToken(null);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
    await verifyAccount();
  };

  const authContextData = {
    handleLoginAccount,
    handleRegisterAccount,
    handleLogout,
    authState,
  };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
