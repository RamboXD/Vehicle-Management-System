import { Layout } from "@/components";
import $api from "@/http";
import { ProgressIndicator } from "@/pages/Admin/components/progressPage";
import { useEffect, useState } from "react";

export function FuelingProfile() {
  const [fuelingPerson, setFuelingPerson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isDataFetched = false;

    const fetchData = async () => {
      try {
        const response = await $api.get("/users/me"); // Adjust API endpoint if needed
        console.log(response);
        if (response.data.status === "success") {
          setFuelingPerson(response.data.fueling_person);
          isDataFetched = true;
        }
      } catch (error) {
        console.error("Error fetching fueling person data:", error);
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
        {fuelingPerson && (
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-800">
                {fuelingPerson.Name} {fuelingPerson.Surname}
              </h1>
              <p className="text-md text-gray-600">
                {fuelingPerson.Certification} -{" "}
                {fuelingPerson.FuelingDetails.length} Fueling Events
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-medium text-gray-700">
                  <strong>Email:</strong> {fuelingPerson.User.Email}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  <strong>Fueling Person ID:</strong>{" "}
                  {fuelingPerson.FuelingPersonID}
                </p>
              </div>
              <div>{/* Add other relevant personal details here */}</div>
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              Fueling Details
            </h2>
            <div className="overflow-x-auto relative mt-6">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-400">
                  <tr>
                    <th className="py-3 px-6">Fueling Date</th>
                    <th className="py-3 px-6">Fuel Quantity</th>
                    <th className="py-3 px-6">Fuel Cost</th>
                    <th className="py-3 px-6">Gas Station Name</th>
                    <th className="py-3 px-6">Fuel Type</th>
                    <th className="py-3 px-6">Receipt Image</th>
                  </tr>
                </thead>
                <tbody>
                  {fuelingPerson.FuelingDetails.map((detail: any) => (
                    <tr key={detail.FuelingDetailID} className="border-b">
                      <td className="py-4 px-6">{detail.FuelingDate}</td>
                      <td className="py-4 px-6">{detail.FuelQuantity}</td>
                      <td className="py-4 px-6">${detail.FuelCost}</td>
                      <td className="py-4 px-6">{detail.GasStationName}</td>
                      <td className="py-4 px-6">{detail.FuelType}</td>
                      <td className="py-4 px-6">
                        <a
                          href={detail.FuelingReceiptImage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Receipt
                        </a>
                      </td>
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
