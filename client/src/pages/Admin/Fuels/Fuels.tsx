import React from "react";
import { Layout } from "@/components";
import { FuelingTable } from "./components";

const Fuels: React.FC = () => {
  return (
    <Layout>
      <p className="text-xl font-semibold">Fueling people</p>
      <FuelingTable />
    </Layout>
  );
};

export default Fuels;
