import { logout } from "../utils/logout";

const Logout = () => {
  return (
    <div>
      <button
        onClick={logout}
        className="py-1 px-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 mt-2"
      >
        Logout
      </button>
    </div>
  );
};
export default Logout;
