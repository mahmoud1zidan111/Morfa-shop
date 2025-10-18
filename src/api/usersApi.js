// src/api/usersApi.js

export function SihItIsUser() {
  const user = localStorage.getItem("user");
  console.log("المستخدم موجود:", user);
  return true;
}

export function NotUser() {
  console.log("مش مستخدم");
  return false;
}

export function GitToken() {
  const user = localStorage.getItem("user");
  return user ? SihItIsUser() : NotUser();
}
