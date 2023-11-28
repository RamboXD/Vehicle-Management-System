import React, { useState, useEffect } from "react";
import { Layout } from "@/components";
import { useParams } from "react-router-dom";
import $api from "@/http";
import { ProgressIndicator } from "@/pages/Admin/components/progressPage";

const Driver: React.FC = () => {
  const driverID = useParams().id;
  console.log(driverID);
  const [driver, setDriver] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isDataFetched = false;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await $api.get(`/driver/drivers/${driverID}`);
        console.log(response);
        setDriver(response.data.driver);
        isDataFetched = true;
        if (progress >= 100) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching driver data:", error);
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
  }, [driverID]);

  if (isLoading || !driver) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressIndicator value={progress} />
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-center p-6">
          <img
            className="h-32 w-32 rounded-full"
            src={
              "https://www.happierhuman.com/wp-content/uploads/2022/07/glass-half-full-type-persons-lessons-learned.jpg"
            }
            alt="Profile Avatar"
          />
        </div>
        <div className="px-6 py-4">
          <div className=" text-gray-700 font-bold text-xl mb-2">
            {driver.Name} {driver.Surname}
          </div>
          <p className="text-gray-700 text-base">
            <strong>Middle Name:</strong> {driver.MiddleName}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Address:</strong> {driver.Address}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Phone:</strong> {driver.Phone}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Email:</strong> {driver.Email}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Driving License Code:</strong> {driver.DrivingLicenseCode}
          </p>
        </div>
      </div>

      <div className="px-6 py-4 mb-4 mt-10 border-t flex justify-center flex-col items-center">
        <h2 className="text-lg font-semibold mb-3">Vehicle Information</h2>
        {driver.HasVehicle && driver.Vehicle ? (
          <div>
            <img
              className="h-32 w-32 rounded-full"
              src={
                "https://i.pinimg.com/736x/8f/97/78/8f97782a937a620fbf9ab504740bf957.jpg"
              }
              alt="Vehicle"
            />
            <p>
              <strong>Model:</strong> {driver.Vehicle.Model}
            </p>
            <p>
              <strong>Year:</strong> {driver.Vehicle.Year}
            </p>
            <p>
              <strong>License Plate:</strong> {driver.Vehicle.LicensePlate}
            </p>
            <p>
              <strong>Status:</strong> {driver.Vehicle.Status}
            </p>
            {/* ... other vehicle details ... */}
          </div>
        ) : (
          <p>This driver has no vehicle assigned.</p>
        )}
      </div>

      <div className="px-6 py-4 border-t">
        <h2 className="text-lg font-semibold">Tasks Completed</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Distance</th>
            </tr>
          </thead>
          <tbody>
            {driver.Tasks && driver.Tasks.length > 0 ? (
              driver.Tasks.map((task: any, index: number) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{task.Title}</td>
                  <td className="border px-4 py-2">{task.Status}</td>
                  <td className="border px-4 py-2">{task.Distance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="border px-4 py-2 text-center">
                  No tasks completed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Driver;
