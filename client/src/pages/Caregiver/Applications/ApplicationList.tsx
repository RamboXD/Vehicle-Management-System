import React, { useEffect, useState } from "react";
import { Layout } from "@/components";
import { getApplications } from "../CaregiverRequests";
import { Application2 } from "../CaregiverTypes";

const ApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<Application2[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const result = await getApplications();
        if (result.data.status === "success") {
          setApplications(result.data.applications);
        } else {
          console.error("Failed to fetch applications");
        }
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    };

    fetchApplications();
  }, []);

  const toggleApplicationDetails = (jobID: string) => {
    if (selectedApplication === jobID) {
      setSelectedApplication(null);
    } else {
      setSelectedApplication(jobID);
    }
  };

  return (
    <Layout>
      <p className="text-xl mb-5 font-semibold">Application List</p>
      <div>
        {applications &&
          applications.map((application) => (
            <div
              key={application.JobDetails.RequiredCaregivingType}
              className="border rounded p-4 mb-4"
            >
              <p>
                Job Required Caregiving Type:{" "}
                {application.JobDetails.RequiredCaregivingType}
              </p>
              <p>
                Date Applied:{" "}
                {new Date(application.DateApplied).toLocaleDateString()}
              </p>
              <button
                onClick={() =>
                  toggleApplicationDetails(application.JobDetails.JobID)
                }
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                {selectedApplication === application.JobDetails.JobID
                  ? "Hide Details"
                  : "Show Member Details"}
              </button>
              {selectedApplication === application.JobDetails.JobID && (
                <div>
                  <p>
                    Member Email:{" "}
                    {application.JobDetails.MemberDetails.UserDetails.Email}
                  </p>
                  <p>
                    Member Name:{" "}
                    {application.JobDetails.MemberDetails.UserDetails.GivenName}{" "}
                    {application.JobDetails.MemberDetails.UserDetails.Surname}
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default ApplicationList;
