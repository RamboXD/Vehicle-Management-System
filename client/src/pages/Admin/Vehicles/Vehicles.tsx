import React from "react";
import { Layout } from "@/components";
import { VehiclesTable } from "./components";

const Vehicles: React.FC = () => {
  return (
    <Layout>
      <p className="text-xl font-semibold">Vehicles</p>
      <VehiclesTable />
    </Layout>
  );
};

export default Vehicles;
