import React, { useEffect, useState } from "react";
import { Layout } from "@/components";
import { Job } from "../CaregiverTypes";
import { applyForJob, getJobs } from "../CaregiverRequests";

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  useEffect(() => {
    // Assuming this is where you fetch job data from your API
    const fetchJobs = async () => {
      try {
        // Replace with your actual API call
        const result = await getJobs();
        console.log(result);
        if (result.status === 200) {
          setJobs(result.data.jobs);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleMemberDetails = (jobID: string) => {
    if (selectedJob === jobID) {
      setSelectedJob(null);
    } else {
      setSelectedJob(jobID);
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.RequiredCaregivingType.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      job.OtherRequirements.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleApply = async (jobID: string) => {
    try {
      const updatedJobs = jobs.filter((job) => job.JobID !== jobID);
      setJobs(updatedJobs);

      const response = await applyForJob(jobID);
      if (response.status !== 200) {
        setJobs(jobs);
        alert("You already applied for this job");
      } else {
        alert("Job application successful");
      }
    } catch (error) {
      setJobs(jobs);
      alert("You already applied for this job");
    }
  };
  return (
    <Layout>
      <p className="text-xl mb-5 font-semibold">Jobs available to apply</p>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded"
        />
      </div>
      {filteredJobs.map((job) => (
        <div
          key={job.JobID}
          className="border rounded p-4 mb-4 flex justify-between items-center"
        >
          <div key={job.JobID} className="border rounded p-4 mb-4">
            <p>Caregiving Type: {job.RequiredCaregivingType}</p>
            <p>Other Requirements: {job.OtherRequirements}</p>
            <p>Date Posted: {new Date(job.DatePosted).toLocaleDateString()}</p>
            {selectedJob === job.JobID && (
              <div>
                <p>Member Email: {job.Member.User.Email}</p>
                <p>
                  Member Name: {job.Member.User.GivenName}{" "}
                  {job.Member.User.Surname}
                </p>
              </div>
            )}
            <button
              onClick={() => toggleMemberDetails(job.JobID)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              {selectedJob === job.JobID
                ? "Hide Details"
                : "Show Member Details"}
            </button>
          </div>
          <div>
            {selectedJob === job.JobID && (
              <button
                onClick={() => toggleMemberDetails(job.JobID)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mr-2"
              >
                {selectedJob === job.JobID
                  ? "Hide Details"
                  : "Show Member Details"}
              </button>
            )}
            <button
              onClick={() => handleApply(job.JobID)}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Apply
            </button>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Jobs;
