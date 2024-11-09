import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const logoutFunc = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    window.location.reload();
    navigate("/");
  };

  return (
    <div>
      <button
        onClick={logoutFunc}
        className="py-1 px-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 mt-2"
      >
        Logout
      </button>
    </div>
  );
};
export default Logout;
