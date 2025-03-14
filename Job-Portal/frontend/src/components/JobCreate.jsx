import { useState } from "react";
import { apiUrl } from "../utils/apiUrl";

const JobCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyName: "",
    location: "",
    jobType: "",
    jobRole: "",
    requirements: [""],
    salaryRange: "",
  });

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);

  const jobTypes = [
    { label: "Full-Time", value: "full-time" },
    { label: "Part-Time", value: "part-time" },
    { label: "Internship", value: "internship" },
    { label: "Freelance", value: "freelance" },
  ];

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "title":
        if (!value) error = "Job title is required.";
        break;
      case "description":
        if (!value) error = "Job description is required.";
        break;
      case "companyName":
        if (!value) error = "Company name is required.";
        break;
      case "location":
        if (!value) error = "Location is required.";
        break;
      case "salaryRange":
        if (
          !value &&
          !/^[\p{Sc}]\d+(?:,\d{3})*(?:\s*[-]\s*[\p{Sc}]\d+(?:,\d{3})*)?$/u.test(
            value
          )
        ) {
          error = "Salary range must be in format '$50000-$70000'.";
        }
        break;

      case "jobRole":
        if (!value) error = "Job role is required.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: newRequirements,
    });
  };
  const removeRequirement = (index) => {
    const updatedRequirements = formData.requirements.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, requirements: updatedRequirements });
  };
  const addRequirement = () => {
    setFormData({ ...formData, requirements: [...formData.requirements, ""] });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleJobTypeChange = (type) => {
    setFormData({ ...formData, jobType: type });
    validateField("jobType", type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasError = Object.values(formData).some((err) => err !== "");
    if (hasError || Object.values(formData).some((data) => data === "")) {
      setMessage("Please fill all the fields");
      setLoader(false);
      return setSuccess(false);
    }
    setLoader(true);
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((item) => item !== ""),
    });

    try {
      const response = await fetch(`${apiUrl}/job/create-job`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setFormData({
        title: "",
        description: "",
        companyName: "",
        location: "",
        jobType: "",
        jobRole: "",
        requirements: [""],
        salaryRange: "",
      });
      setErrors({});
      setMessage(response.message);
      setSuccess(true);
    } catch (error) {
      setMessage(error.message);
      setSuccess(false);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create a Job Posting
      </h3>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Job Title and Company Name Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Enter job title"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Enter company name"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.companyName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-2">{errors.companyName}</p>
            )}
          </div>
        </div>

        {/* Job Description Section */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Job Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Enter job description"
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">{errors.description}</p>
          )}
        </div>

        {/* Location and Salary Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Enter job location"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-2">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Salary Range
            </label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="e.g., 50000-70000"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.salaryRange ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.salaryRange && (
              <p className="text-red-500 text-sm mt-2">{errors.salaryRange}</p>
            )}
          </div>
        </div>

        {/* Requirements Section */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Requirements
          </label>
          {formData.requirements.map((requirement, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <input
                type="text"
                name={`requirements[${index}]`}
                value={requirement}
                onChange={(event) =>
                  handleRequirementChange(index, event.target.value)
                }
                placeholder={`Requirement ${index + 1}`}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {formData.requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addRequirement}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Add Requirement
          </button>
        </div>

        {/* Job Type Section */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <div className="flex gap-4">
            {jobTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => handleJobTypeChange(type.value)}
                className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                  formData.jobType === type.value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-600 mb-1">
            Job Role
          </label>
          <input
            type="text"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Enter job role"
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
              errors.jobRole ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.jobRole && (
            <p className="text-red-500 text-sm mt-1">{errors.jobRole}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ${
              loader ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            disabled={loader}
          >
            {loader ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            ) : (
              "Create Job"
            )}
          </button>
        </div>
      </form>
      {message && (
        <p
          className={`text-center text-sm mt-4 ${
            success ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default JobCreate;
