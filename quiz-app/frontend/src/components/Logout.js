import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setIsLoggedIn, appLoader, setAppLoader } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    setAppLoader(true);
    try {
      const response = await fetch(
        "https://quiz-app-backend-5k5j.onrender.com/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(false);
        navigate("/");
      } else {
        console.error("Logout failed", data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setTimeout(() => {
        setAppLoader(false);
      }, 200);
    }
  };

  return (
    <div>
      <button
        onClick={logout}
        className="text-red-600 font-semibold rounded-md hover:text-red-700 mt-1"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
