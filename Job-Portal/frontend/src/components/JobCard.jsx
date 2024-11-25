import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-dark transition-shadow duration-400 ease-in-out flex flex-col">
      {/* Recruiter Info */}
      <div className="flex items-center mb-4">
        <img
          src={job.recruiter.profilePicture || "/user.png"}
          alt="Recruiter"
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {job.recruiter.fullName}
          </p>
          <p className="text-sm text-gray-600">@{job.recruiter.username}</p>
        </div>
      </div>

      {/* Job Title */}
      <h2 className="text-2xl font-semibold text-primary mb-2">{job.title}</h2>
      <p className="text-lg text-gray-700 font-medium mb-2">
        {job.companyName}
      </p>
      <p className="text-sm text-gray-500">{job.location}</p>

      {/* Job Type & Role */}
      <div className="flex items-center mt-2 mb-4">
        <span className="text-xs px-3 py-1 bg-green-200 text-green-800 rounded-full mr-2">
          {job.jobType}
        </span>
        <span className="text-xs px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full">
          {job.jobRole}
        </span>
      </div>

      {/* Job Description */}
      <p className="mt-2 text-sm text-gray-800">{job.description}</p>

      {/* Salary Info */}
      <p className="mt-2 text-sm text-gray-500">
        {job.salaryRange
          ? `Salary: ${job.salaryRange}`
          : "Salary: Not disclosed"}
      </p>

      {/* Requirements */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">Requirements:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          {job.requirements && job.requirements.length > 0 ? (
            job.requirements.map((requirement, index) => (
              <li key={index} className="mt-1">
                {requirement}
              </li>
            ))
          ) : (
            <p>No requirements listed.</p>
          )}
        </ul>
      </div>

      {/* Apply Button and Date */}
      <div className="mt-4 flex justify-between items-center">
        <button className="btn-primary">Apply Now</button>
        <p className="text-sm text-gray-400">
          {new Date(job.postedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
