import React, { useState, useEffect } from "react";
import { Layout } from "@/components";
import { useParams } from "react-router-dom";
import $api from "@/http";
import { ProgressIndicator } from "@/pages/Admin/components/progressPage";

const FuelingPerson: React.FC = () => {
  const fuelingPersonID = useParams().id;
  const [fuelingPerson, setFuelingPerson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isDataFetched = false;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await $api.get(
          `/fueling_person/fueling_persons/${fuelingPersonID}`
        );
        console.log(response);
        setFuelingPerson(response.data.fueling_person);
        isDataFetched = true;
        if (progress >= 100) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching fueling person data:", error);
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
  }, [fuelingPersonID]);

  if (isLoading || !fuelingPerson) {
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
              "https://www.shutterstock.com/image-photo/man-fuel-pump-nozzle-self-260nw-1870538035.jpg"
            }
            alt="Profile Avatar"
          />
        </div>
        <div className="px-6 py-4">
          <div className="text-gray-700 font-bold text-xl mb-2">
            {fuelingPerson.Name} {fuelingPerson.Surname}
          </div>
          <p className="text-gray-700 text-base">
            <strong>Middle Name:</strong> {fuelingPerson.MiddleName}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Certification:</strong> {fuelingPerson.Certification}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Email:</strong> {fuelingPerson.User.Email}
          </p>
        </div>
      </div>
      <div className="px-6 mt-5 py-4 border-t">
        <h2 className="text-lg font-semibold">Fueling Details</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Cost</th>
              <th className="px-4 py-2 text-left">Gas Station</th>
              <th className="px-4 py-2 text-left">Fuel Type</th>
            </tr>
          </thead>
          <tbody>
            {fuelingPerson.FuelingDetails &&
            fuelingPerson.FuelingDetails.length > 0 ? (
              fuelingPerson.FuelingDetails.map((detail: any, index: number) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    {new Date(detail.FuelingDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{detail.FuelQuantity}</td>
                  <td className="border px-4 py-2">{detail.FuelCost}</td>
                  <td className="border px-4 py-2">{detail.GasStationName}</td>
                  <td className="border px-4 py-2">{detail.FuelType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="border px-4 py-2 text-center">
                  No fueling details available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default FuelingPerson;
