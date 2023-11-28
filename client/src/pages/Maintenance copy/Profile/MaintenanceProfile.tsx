import { Layout } from "@/components";
import $api from "@/http";
import { ProgressIndicator } from "@/pages/Admin/components/progressPage";
import { useEffect, useState } from "react";

export function MaintenanceProfile() {
  const [maintenancePerson, setMaintenancePerson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let isDataFetched = false;

    const fetchData = async () => {
      try {
        const response = await $api.get("/users/me"); // Replace with your API call
        console.log(response);
        if (response.data.status === "success") {
          setMaintenancePerson(response.data.maintenance_person);
          isDataFetched = true;
        }
      } catch (error) {
        console.error("Error fetching driver data:", error);
        isDataFetched = true;
      }

      if (progress >= 100) {
        setIsLoading(false);
      }
    };

    fetchData();

    const incrementProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (isDataFetched) {
            setIsLoading(false);
          }
          return 100;
        }
        return prev + 10;
      });
    };

    let timer = setInterval(incrementProgress, 200);

    return () => clearInterval(timer);
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressIndicator value={progress} />
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-4 rounded-md shadow">
        {maintenancePerson && (
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-800">
                {maintenancePerson.Name} {maintenancePerson.Surname}
              </h1>
              <p className="text-md text-gray-600">
                {maintenancePerson.Qualifications} -{" "}
                {maintenancePerson.Experience}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-medium text-gray-700">
                  <strong>Email:</strong> {maintenancePerson.User.Email}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  <strong>Maintenance Person ID:</strong>{" "}
                  {maintenancePerson.MaintenancePersonID}
                </p>
              </div>
              <div>{/* Add other relevant personal details here */}</div>
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              Maintenance Details
            </h2>
            <div className="overflow-x-auto relative mt-6">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-400">
                  <tr>
                    <th className="py-3 px-6">Service Type</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Description</th>
                    <th className="py-3 px-6">Cost</th>
                    <th className="py-3 px-6">Parts Replaced</th>
                    <th className="py-3 px-6">Odometer Reading</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenancePerson.MaintenanceDetails.map((detail: any) => (
                    <tr key={detail.MaintenanceDetailID} className=" border-b">
                      <td className="py-4 px-6">{detail.ServiceType}</td>
                      <td className="py-4 px-6">{detail.ServiceDate}</td>
                      <td className="py-4 px-6">{detail.Description}</td>
                      <td className="py-4 px-6">${detail.Cost}</td>
                      <td className="py-4 px-6">{detail.PartsReplaced}</td>
                      <td className="py-4 px-6">{detail.OdometerReading} km</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
