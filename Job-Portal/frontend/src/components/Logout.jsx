import { useContext } from "react";
import { UserStatusContext } from "../context/UserStatus";
import { apiUrl } from "../utils/apiUrl";

const Logout = () => {
  const { setUserStatus } = useContext(UserStatusContext);
  const handleLogout = async () => {
    try {
      await fetch(`${apiUrl}/user/auth/logout`, {
        method: "POST",

        credentials: "include",
      });
      setUserStatus(null);
    } catch (error) {}
  };

  return (
    <button
      className="bg-red-500  text-white hover:bg-red-600  px-6 py-2 rounded-lg transition-all duration-300"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
