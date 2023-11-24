import { Input, Layout } from "@/components";
import { jobsTable } from "@/ts/types";
import { useEffect, useState } from "react";
import { getOrganizations } from "./api";
import { createJob } from "./api/getOrganizations/getOrganizations";
import { useNavigate } from "react-router-dom";
const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<jobsTable[]>([]);
  const [formData, setFormData] = useState({
    required_caregiving_type: "",
    other_requirements: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const get = async () => {
      const result = await getOrganizations();
      const jobs = result.data.jobs.map((org) => ({
        JobID: org.JobID,
        OtherRequirements: org.OtherRequirements,
        RequiredCaregivingType: org.RequiredCaregivingType,
        DatePosted: org.DatePosted,
      }));
      setJobs(jobs);
    };

    get();
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createJob(formData);
      console.log("Job created successfully", response);
    } catch (error) {
      console.error("Error creating job", error);
    }
  };

  const handleButtonClick = (jobID: string) => {
    navigate(`/job-applicants/${jobID}`);
  };

  return (
    <Layout>
      <p className="text-xl font-semibold">Jobs</p>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="required_caregiving_type">
            Required Caregiving Type:
          </label>
          <Input
            type="text"
            id="required_caregiving_type"
            name="required_caregiving_type"
            value={formData.required_caregiving_type}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="other_requirements">Other Requirements:</label>
          <Input
            type="text"
            id="other_requirements"
            name="other_requirements"
            value={formData.other_requirements}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Create Job
        </button>
      </form>
      <div className="mt-4">
        {jobs.map((job) => (
          <div key={job.JobID} className="border rounded p-4 mb-4">
            {/* <p>Job ID: {job.JobID}</p> */}
            <p>Required Caregiving Type: {job.RequiredCaregivingType}</p>
            <p>Other Requirements: {job.OtherRequirements}</p>
            <p>Date Posted: {job.DatePosted}</p>
            <button
              onClick={() => handleButtonClick(job.JobID)}
              className="bg-blue-500 text-white px-4 py-2 mt-2"
            >
              Who Applied?
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Jobs;
