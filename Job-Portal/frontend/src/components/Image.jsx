import { useReducer } from "react";
import { FaTimes } from "react-icons/fa";
import {
  AiOutlineClose,
  AiOutlineCheck,
  AiOutlineEdit,
  AiOutlineCloudUpload,
  AiOutlineDelete,
} from "react-icons/ai";
import { apiUrl } from "../utils/apiUrl";

const initialState = {
  imageContainer: "./user.png",
  isEditing: false,
  status: {
    complete: false,
    remove: false,
    loading: false,
  },
  alert: { message: "", type: "" },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_IMAGE":
      return { ...state, imageContainer: action.payload };
    case "SET_EDITING":
      return { ...state, isEditing: action.payload };
    case "SET_STATUS":
      return { ...state, status: { ...state.status, ...action.payload } };
    case "SET_ALERT":
      return { ...state, alert: action.payload };
    default:
      return state;
  }
};

const Image = ({ setImage, profilePicture }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    imageContainer: profilePicture,
  });

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      dispatch({ type: "SET_IMAGE", payload: file });
      dispatch({ type: "SET_STATUS", payload: { complete: true } });
    }
  };

  const handleRemoveImage = () => {
    dispatch({ type: "SET_STATUS", payload: { complete: true, remove: true } });
    dispatch({ type: "SET_IMAGE", payload: "./user.png" });
  };

  const removeImageFunc = async () => {
    dispatch({ type: "SET_STATUS", payload: { loading: true } });
    try {
      await fetch(`${apiUrl}/user/update/remove-profile`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: "SET_STATUS",
        payload: { loading: false, complete: false, remove: false },
      });
      dispatch({ type: "SET_EDITING", payload: false });
    }
  };

  const handleSave = async () => {
    dispatch({ type: "SET_STATUS", payload: { loading: true } });
    if (state.status.remove) {
      return removeImageFunc();
    }
    try {
      const formData = new FormData();
      formData.append("profilePicture", state.imageContainer);
      const response = await fetch(`${apiUrl}/user/update/upload-profile`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      dispatch({ type: "SET_IMAGE", payload: data.picture });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: "SET_STATUS",
        payload: { loading: false, complete: false },
      });
      dispatch({ type: "SET_EDITING", payload: false });
    }
  };

  const ActionButton = ({ onClick, icon, text, color, loading = false }) => (
    <button
      className={`w-40 h-12 text-white bg-${color}-500 rounded-full shadow-lg flex items-center justify-center gap-2 transition hover:bg-${color}-600`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <>
          {icon}
          <span>{text}</span>
        </>
      )}
    </button>
  );

  const handleCancel = () => {
    dispatch({ type: "SET_STATUS", payload: { complete: false } });
    dispatch({ type: "SET_EDITING", payload: false });
    dispatch({ type: "SET_IMAGE", payload: profilePicture });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <button
        className="absolute top-4 right-4 text-white bg-gray-700 p-2 rounded-full shadow-lg z-10 hover:bg-gray-900 transition"
        onClick={() => setImage(false)}
      >
        <FaTimes className="text-2xl" />
      </button>

      <div className="w-full max-w-md p-4">
        <div className="relative flex flex-col items-center">
          <div className="w-full aspect-square sm:w-40 md:w-60 lg:w-80 xl:w-96 overflow-hidden rounded-full border-4 border-gray-700 flex items-center justify-center">
            <img
              src={state.imageContainer || "/user.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4 ">
            {!state.isEditing && (
              <ActionButton
                onClick={() => dispatch({ type: "SET_EDITING", payload: true })}
                icon={<AiOutlineEdit className="text-2xl" />}
                text="Edit"
                color="indigo"
              />
            )}
          </div>

          {state.isEditing && (
            <div className="mt-6 grid grid-cols-2 gap-4 p-4 rounded-lg shadow-xl">
              {!state.status.complete && (
                <>
                  <ActionButton
                    onClick={handleRemoveImage}
                    icon={<AiOutlineDelete className="text-lg" />}
                    text="Remove Image"
                    color="sky"
                  />
                  <label
                    htmlFor="changeImage"
                    className="w-40 h-12 bg-blue-500 text-white rounded-full shadow-lg transition flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 hover:text-blue-500"
                  >
                    <AiOutlineCloudUpload className="text-lg" />
                    Change Image
                    <input
                      id="changeImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleChangeImage}
                    />
                  </label>
                </>
              )}
              {state.status.complete && (
                <>
                  <ActionButton
                    onClick={handleCancel}
                    icon={<AiOutlineClose className="text-lg" />}
                    text="Cancel"
                    color="red"
                    loading={state.status.loading}
                  />
                  <ActionButton
                    onClick={handleSave}
                    icon={<AiOutlineCheck className="text-lg" />}
                    text="Save"
                    color="green"
                    loading={state.status.loading}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Image;
