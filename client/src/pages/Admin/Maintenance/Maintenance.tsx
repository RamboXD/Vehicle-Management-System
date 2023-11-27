import React from "react";
import { Layout } from "@/components";
import { MaintenanceTable } from "./components";

const Maintenance: React.FC = () => {
  return (
    <Layout>
      <p className="text-xl font-semibold">Maintenance people</p>
      <MaintenanceTable />
    </Layout>
  );
};

export default Maintenance;
