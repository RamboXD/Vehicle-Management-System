import React, { useState, useEffect } from "react";
import { Layout } from "@/components";
import { useParams } from "react-router-dom";
import $api from "@/http";
import { ProgressIndicator } from "@/pages/Admin/components/progressPage";

const MaintenancePerson: React.FC = () => {
  const maintenancePersonID = useParams().id;
  const [maintenancePerson, setMaintenancePerson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isDataFetched = false;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await $api.get(
          `/maintenance_person/maintenance_persons/${maintenancePersonID}`
        );
        setMaintenancePerson(response.data.maintenance_person);
        isDataFetched = true;
        if (progress >= 100) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching maintenance person data:", error);
        isDataFetched = true;
        if (progress >= 100) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    const incrementProgress = () => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          if (isDataFetched) {
            setIsLoading(false);
          }
          return 100;
        }
        return prevProgress + 10;
      });
    };

    let timer = setInterval(incrementProgress, 200);

    return () => clearInterval(timer);
  }, [maintenancePersonID]);

  if (isLoading || !maintenancePerson) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressIndicator value={progress} />
      </div>
    );
  }

  return (
    <Layout>
      {/* Profile Information Section */}
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-center p-6">
          <img
            className="h-32 w-32 rounded-full"
            src="https://www.shutterstock.com/image-photo/smiling-mechanic-portrait-260nw-530786860.jpg"
            alt="Profile Avatar"
          />
        </div>
        <div className="px-6 py-4">
          <div className="text-gray-700 font-bold text-xl mb-2">
            {maintenancePerson.Name} {maintenancePerson.Surname}
          </div>
          <p className="text-gray-700 text-base">
            <strong>Middle Name:</strong> {maintenancePerson.MiddleName}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Qualifications:</strong> {maintenancePerson.Qualifications}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Experience:</strong> {maintenancePerson.Experience}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Email:</strong> {maintenancePerson.User.Email}
          </p>
        </div>
      </div>

      <div className="mt-10 px-6 py-4 border-t">
        <h2 className="text-lg font-semibold">Maintenance Details</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Service Date</th>
              <th className="px-4 py-2 text-left">Service Type</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Cost</th>
            </tr>
          </thead>
          <tbody>
            {maintenancePerson.MaintenanceDetails &&
            maintenancePerson.MaintenanceDetails.length > 0 ? (
              maintenancePerson.MaintenanceDetails.map(
                (detail: any, index: number) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      {new Date(detail.ServiceDate).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">{detail.ServiceType}</td>
                    <td className="border px-4 py-2">{detail.Description}</td>
                    <td className="border px-4 py-2">{detail.Cost}</td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={4} className="border px-4 py-2 text-center">
                  No maintenance details available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default MaintenancePerson;
