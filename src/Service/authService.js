import axios from "axios";

const AUTH_API = "https://fwa-ec-quiz-mock1.herokuapp.com/v1/auth/";
// const data = JSON.parse(localStorage.getItem("data"));

// let userToken;
// if (data && data.tokens) {
//   userToken = "Bearer " + data.tokens.access.tokens;
// }

const authApi = axios.create({
  baseURL: AUTH_API,
  headers: {
    contentType: "application/json",
    // Authorization: userToken,
  },
});

const register = (username, password, email) => {
  return authApi.post("register", {
    username,
    password,
    email,
  });
};

const login = (username, password) => {
  return authApi.post("login", {
    username,
    password,
  });
};

const refreshToken = (refreshToken) => {
  return authApi.post("refresh-tokens", refreshToken);
};

const logout = () => {
  localStorage.removeItem("data");
};

const authService = {
  register,
  login,
  logout,
  refreshToken,
};

export default authService;
