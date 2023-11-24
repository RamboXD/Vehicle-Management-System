import React, { useEffect, useState } from "react";
import { Layout } from "@/components";
import {
  getAppointments,
  confirmAppointment,
  declineAppointment,
} from "../CaregiverRequests"; // API calls
import { Appointment } from "../CaregiverTypes";

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const result = await getAppointments();
        if (result.data.status === "success") {
          setAppointments(result.data.appointments);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    };

    fetchAppointments();
  }, []);

  const toggleMemberDetails = (appointmentID: string) => {
    setSelectedAppointment(
      selectedAppointment === appointmentID ? null : appointmentID
    );
  };

  const handleConfirm = async (appointmentID: string) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.AppointmentID === appointmentID
        ? { ...appointment, Status: "Confirmed" }
        : appointment
    );
    setAppointments(updatedAppointments);

    confirmAppointment(appointmentID).then(() => {
      alert("Appointment status updated to Confirmed");
    });
  };
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Confirmed":
        return "bg-green-200 text-green-800";
      case "Declined":
        return "bg-red-200 text-red-800";
      default:
        return "";
    }
  };
  const handleDecline = async (appointmentID: string) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.AppointmentID === appointmentID
        ? { ...appointment, Status: "Declined" }
        : appointment
    );
    setAppointments(updatedAppointments);

    declineAppointment(appointmentID).then(() => {
      alert("Appointment status updated to Declined");
    });
  };

  return (
    <Layout>
      <p className="text-xl mb-5 font-semibold">Appointments List</p>
      <div>
        {appointments.map((appointment) => (
          <div
            key={appointment.AppointmentID}
            className={`border rounded p-4 mb-4 ${getStatusStyle(
              appointment.Status
            )}`}
          >
            <p>
              Appointment Date:{" "}
              {new Date(appointment.AppointmentDate).toLocaleDateString()}
            </p>
            <p>Work Hours: {appointment.WorkHours}</p>
            <p>Status: {appointment.Status}</p>
            <button
              onClick={() => toggleMemberDetails(appointment.AppointmentID)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mr-2"
            >
              {selectedAppointment === appointment.AppointmentID
                ? "Hide Member Details"
                : "Show Member Details"}
            </button>
            {selectedAppointment === appointment.AppointmentID && (
              <div>
                <p>Member Email: {appointment.Member.User.Email}</p>
                <p>
                  Member Name: {appointment.Member.User.GivenName}{" "}
                  {appointment.Member.User.Surname}
                </p>
              </div>
            )}
            {appointment.Status === "Pending" ? (
              <>
                <button
                  onClick={() => handleConfirm(appointment.AppointmentID)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2 mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleDecline(appointment.AppointmentID)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Decline
                </button>
              </>
            ) : (
              <>
                <button
                  disabled
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-2 mr-2"
                >
                  Confirm
                </button>
                <button
                  disabled
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                >
                  Decline
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AppointmentList;
