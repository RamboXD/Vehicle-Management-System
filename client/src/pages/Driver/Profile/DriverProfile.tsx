import { Layout } from "@/components";
import $api from "@/http";
import { ProgressIndicator } from "@/pages/Admin/components/progressPage";
import { useEffect, useState } from "react";

export function DriverProfile() {
  const [driverData, setDriverData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let isDataFetched = false;

    const fetchData = async () => {
      try {
        const response = await $api.get("/users/me"); // Replace with your API call
        console.log(response);
        if (response.data.status === "success") {
          setDriverData(response.data.driver);
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
        {driverData && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-700">
              {driverData.Name} {driverData.Surname}
            </h1>
            <p>
              <strong>Email:</strong> {driverData.Email}
            </p>
            <p>
              <strong>Phone:</strong> {driverData.Phone}
            </p>
            <p>
              <strong>Address:</strong> {driverData.Address}
            </p>
            <p>
              <strong>Driving License:</strong> {driverData.DrivingLicenseCode}
            </p>
            <p>
              <strong>Vehicle Model:</strong>{" "}
              {driverData.Vehicle?.Model || "No vehicle assigned"}
            </p>
            <p>
              <strong>Vehicle License Plate:</strong>{" "}
              {driverData.Vehicle?.LicensePlate || "N/A"}
            </p>

            <h2 className="text-xl font-semibold text-gray-700">
              Tasks Finished
            </h2>
            <div className="overflow-x-auto relative mt-6">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Title
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-6">
                      From
                    </th>
                    <th scope="col" className="py-3 px-6">
                      To
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Distance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {driverData.Tasks.map((task: any) => (
                    <tr
                      key={task.TaskID}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="py-4 px-6">{task.Title}</td>
                      <td className="py-4 px-6">{task.Status}</td>
                      <td className="py-4 px-6">{task.WhereFrom}</td>
                      <td className="py-4 px-6">{task.WhereTo}</td>
                      <td className="py-4 px-6">{task.Distance} km</td>
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
