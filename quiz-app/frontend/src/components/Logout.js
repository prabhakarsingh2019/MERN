import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <div>
      <button
        onClick={logout}
        className="  text-red-600 font-semibold rounded-md hover:text-red-700 mt-1"
      >
        Logout
      </button>
    </div>
  );
};
export default Logout;
