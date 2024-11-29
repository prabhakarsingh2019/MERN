import { useEffect, useState } from "react";
import { apiUrl } from "../utils/apiUrl";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { AiOutlineSave } from "react-icons/ai";
import { validateEditField } from "../utils/validData";
import Image from "./Image";
const Profile = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    email: "",
    role: "",
    resume: "",
    profilePicture: "",
    socialLinks: { linkedin: "", github: "" },
    contactNumber: "",
    address: "",
    bio: "",
    skills: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(false);
  const [error, setError] = useState({});
  const fetchUserProfile = async () => {
    setLoader(true);
    try {
      const response = await fetch(`${apiUrl}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setUserData(data.user);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleBlur = (e) => {
    const err = validateEditField(e.target.name, e.target.value);
    setError({ ...error, [e.target.name]: err });
  };

  const handleLogout = () => {};
  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSocialLinksChange = (e) => {
    setUserData({
      ...userData,
      socialLinks: {
        ...userData.socialLinks,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await fetch(`${apiUrl}/user/update`, {
        body: JSON.stringify(userData),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      await response.json();
      await fetchUserProfile();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoader(false);
      setIsEditing(false);
    }
  };

  const addSkill = () => {
    setUserData({
      ...userData,
      skills: [...userData.skills, ""],
    });
  };
  const removeSkill = (index) => {
    const updatedSkills = [...userData.skills];
    updatedSkills.splice(index, 1);
    setUserData((prev) => ({ ...prev, skills: updatedSkills }));
  };

  return (
    <div>
      {image && (
        <div className="bg-[rgba(0,0,0,0.2)] fixed top-0 left-0 w-full h-screen backdrop-blur-md z-10">
          <Image setImage={setImage} profilePicture={userData.profilePicture} />
        </div>
      )}

      <div className="flex flex-col md:flex-row h-screen">
        {/* aside section */}
        <aside className="w-full md:w-64 bg-gray-100 flex flex-col items-center p-4">
          <div className="relative w-32 h-32 mb-4">
            <img
              src={userData.profilePicture || "/user.png"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
              onClick={() => setImage(true)}
            />
          </div>

          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </aside>

        {/* main section */}
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          <div>
            <h1 className="text-3xl font-bold mb-6 text-black">Dashboard</h1>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-black">Profile</h2>
              <button
                className={`p-2 px-4 rounded block font-medium text-white ${
                  !isEditing ? "bg-black" : "bg-green-500"
                }`}
                onClick={(e) =>
                  !isEditing ? setIsEditing(true) : handleSave(e)
                }
                disabled={loader}
              >
                {!loader ? (
                  !isEditing ? (
                    <>
                      <HiPencil className="inline mr-1 mb-1 text-white" />
                      Edit
                    </>
                  ) : (
                    <>
                      <AiOutlineSave className="inline mb-1 mr-1 text-white" />
                      Save
                    </>
                  )
                ) : (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 border rounded ${
                    isEditing
                      ? "bg-white border-3 border-black"
                      : "bg-gray-200 border-0"
                  }`}
                  readOnly={!isEditing}
                />
                {error.fullName && (
                  <p className="text-red-500 font-medium text-xs">
                    {error.fullName}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 border rounded ${
                    isEditing
                      ? "bg-white border-3 border-black"
                      : "bg-gray-200 border-0"
                  }`}
                  readOnly={!isEditing}
                />
                {error.username && (
                  <p className="text-red-500 font-medium text-xs">
                    {error.username}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 border rounded ${
                    isEditing
                      ? "bg-white border-3 border-black"
                      : "bg-gray-200 border-0"
                  }`}
                  readOnly={!isEditing}
                />
                {error.email && (
                  <p className="text-red-500 font-medium text-xs">
                    {error.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={userData.contactNumber}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 border rounded ${
                    isEditing
                      ? "bg-white border-3 border-black"
                      : "bg-gray-200 border-0"
                  }`}
                  readOnly={!isEditing}
                />
                {error.contactNumber && (
                  <p className="text-red-500 font-medium text-xs">
                    {error.contactNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${
                    isEditing
                      ? "bg-white border-3 border-black"
                      : "bg-gray-200 border-0"
                  }`}
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={userData.bio}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 border rounded ${
                    isEditing
                      ? "bg-white border-3 border-black"
                      : "bg-gray-200 border-0"
                  }`}
                  readOnly={!isEditing}
                />
                {error.bio && (
                  <p className="text-red-500 font-medium text-xs">
                    {error.bio}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Skills</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {userData.skills && userData.skills.length > 0 ? (
                  userData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) =>
                          setUserData((prev) => {
                            const updatedSkills = [...prev.skills];
                            updatedSkills[index] = e.target.value;
                            return { ...prev, skills: updatedSkills };
                          })
                        }
                        className={`w-full p-2 border rounded ${
                          isEditing
                            ? "bg-white border-3 border-black"
                            : "bg-gray-200 border-0"
                        }`}
                        readOnly={!isEditing}
                      />
                      {isEditing && (
                        <button
                          className="text-sm px-2 py-1 bg-red-500 text-white rounded"
                          onClick={() => removeSkill(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))
                ) : !isEditing ? (
                  <p className="block font-medium text-gray-700">
                    no skills added
                  </p>
                ) : (
                  <></>
                )}
                {isEditing && (
                  <button
                    className="text-sm px-2 py-1 bg-green-500 text-white rounded"
                    onClick={addSkill}
                  >
                    Add Skill
                  </button>
                )}
              </div>
            </div>
            <div>
              {isEditing ? (
                <div>
                  <h5 className="block font-medium text-black">
                    Social Links:{" "}
                  </h5>
                  <div>
                    <label
                      htmlFor="linkedin"
                      className="block font-medium text-gray-700"
                    >
                      LinkedIn:
                    </label>
                    <input
                      type="text"
                      id="linkedin"
                      name="linkedin"
                      value={userData.socialLinks.linkedin}
                      onChange={handleSocialLinksChange}
                      readOnly={!isEditing}
                      onBlur={handleBlur}
                      className={`w-full p-2 border rounded ${
                        isEditing
                          ? "bg-white border-3 border-black"
                          : "bg-gray-200 border-0"
                      }`}
                    />
                    {error.linkedin && (
                      <p className="text-red-500 font-medium text-xs">
                        {error.linkedin}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="github"
                      className="block font-medium text-gray-700"
                    >
                      GitHub:
                    </label>
                    <input
                      type="text"
                      id="github"
                      name="github"
                      value={userData.socialLinks.github}
                      onChange={handleSocialLinksChange}
                      onBlur={handleBlur}
                      readOnly={!isEditing}
                      className={`w-full p-2 border rounded ${
                        isEditing
                          ? "bg-white border-3 border-black"
                          : "bg-gray-200 border-0"
                      }`}
                    />
                    {error.github && (
                      <p className="text-red-500 font-medium text-xs">
                        {error.github}
                      </p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
