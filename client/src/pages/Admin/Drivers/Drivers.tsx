import React from "react";
import { Layout } from "@/components";
import { DriverTable } from "./components";

const Drivers: React.FC = () => {
  return (
    <Layout>
      <p className="text-xl font-semibold">Drivers</p>
      <DriverTable />
    </Layout>
  );
};

export default Drivers;
