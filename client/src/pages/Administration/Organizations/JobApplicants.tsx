import React, { useEffect, useState, ChangeEvent } from "react";
import { Layout } from "@/components";
import {
  createAppointment,
  getCaregiversForJob,
} from "../Organizations/api/getOrganizations/getOrganizations";
import { GetCaregiverData2 } from "@/ts/types";
import { useParams } from "react-router-dom";

const JobApplicants: React.FC = () => {
  const jobID = useParams().id;
  const [caregivers, setCaregivers] = useState<GetCaregiverData2[] | null>([]);
  const [selectedCaregiver, setSelectedCaregiver] = useState<string>("");

  const [appointmentDetails, setAppointmentDetails] = useState({
    appointmentDate: "",
    appointmentTime: "",
    workHour: 0,
  });
  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const result = await getCaregiversForJob(jobID);
        if (result.status === 200) {
          setCaregivers(result.data.caregivers);
        } else {
          console.error("Failed to fetch caregivers for job");
        }
      } catch (error) {
        console.error("Error fetching caregivers for job", error);
      }
    };

    fetchCaregivers();
  }, [jobID]);

  const toggleAppointmentForm = (caregiverID: string) => {
    if (selectedCaregiver === caregiverID) {
      setSelectedCaregiver("");
    } else {
      setSelectedCaregiver(caregiverID);
    }
  };
  const formatDateTimeForApi = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    // Format the date-time string to ISO 8601 format
    return date.toISOString();
  };

  const handleAppointmentCreation = async () => {
    const formattedDateTime = formatDateTimeForApi(
      appointmentDetails.appointmentDate
    );
    console.log({
      ...appointmentDetails,
      appointmentDate: formattedDateTime,
      caregiverUserId: selectedCaregiver,
    });
    const data = {
      ...appointmentDetails,
      appointmentDate: formattedDateTime,
      caregiverUserId: selectedCaregiver,
    };
    data.appointmentTime = data.appointmentDate;
    try {
      const response = await createAppointment(data);
      alert("Appointment created successfully");
      console.log("Appointment created successfully", response);
    } catch (error) {
      console.error("Error creating job", error);
    }
    // API call to create an appointment
    setSelectedCaregiver(""); // Reset after creating an appointment
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAppointmentDetails({
      ...appointmentDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      {!caregivers && <div>No appliers for this job</div>}
      {caregivers &&
        caregivers.map((caregiver) => (
          <div
            key={caregiver.caregiverUserId}
            className="border rounded p-4 mb-4 flex justify-between items-center"
          >
            <div>
              <img
                src="https://www.isavta.co.il/content/migrated-a779904c62a810bcaef859555e16fdc2-592.jpg"
                alt="Caregiver"
                className="w-16 h-16 rounded-full mb-2"
              />
              <p>
                Caregiver fullname: {caregiver.givenName} {caregiver.surname}
              </p>
              <p>Caregiving Type: {caregiver.caregivingType}</p>
              <p>Hourly Rate: ${caregiver.hourlyRate}</p>
            </div>
            {selectedCaregiver === caregiver.caregiverUserId ? (
              <div className="pr-5">
                <label
                  htmlFor="appointmentDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Appointment Date
                </label>
                <input
                  type="datetime-local"
                  id="appointmentDate"
                  name="appointmentDate"
                  value={appointmentDetails.appointmentDate}
                  onChange={handleFormChange}
                  className="px-4 py-2 border rounded mb-2"
                />

                <label
                  htmlFor="workHour"
                  className="block text-sm font-medium text-gray-700"
                >
                  Work Hours
                </label>
                <input
                  type="number"
                  id="workHour"
                  name="workHour"
                  value={appointmentDetails.workHour}
                  onChange={handleFormChange}
                  className="px-4 py-2 border rounded mb-2"
                />
                <button
                  onClick={handleAppointmentCreation}
                  className="bg-green-500 text-white px-4 py-2 ml-5 rounded"
                >
                  Create
                </button>
              </div>
            ) : (
              <button
                onClick={() => toggleAppointmentForm(caregiver.caregiverUserId)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Make Appointment
              </button>
            )}
          </div>
        ))}
    </Layout>
  );
  // ... other handlers and JSX similar to Deals component ...
};

export default JobApplicants;
