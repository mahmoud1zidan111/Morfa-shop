import axiosInstance from "./axiosInstance";

//  ====User Authentication API Functions====
// registerUser → Send registration data to the backend

//  Register a new user
export async function registerUser(userData) {
  const response = await axiosInstance.post("/api/Auth/Register", userData);
  return response.data;
}

// loginUser → Send login credentials and store the token if successful

//  Login user

export async function loginUser(credentials) {
  const response = await axiosInstance.post("/api/Auth/Login", credentials);

  // isLoggedIn → Check if a token exists in localStorage
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
}

// Check if user is logged in
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

// logoutUser → Remove token from localStorage to log out
// Logout user

export function logoutUser() {
  localStorage.removeItem("token");
}
