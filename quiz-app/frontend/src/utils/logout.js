import { useNavigate } from "react-router-dom";

export const logout = () => {
  const navigate = useNavigate;
  localStorage.removeItem("authToken");
  window.location.reload();
  navigate("/");
};
