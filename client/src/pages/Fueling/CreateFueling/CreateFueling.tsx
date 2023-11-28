import React from "react";
import { Layout } from "@/components";
import { CreateFuelingTable } from "../components/CreateFuelingTable";

const CreateFueling: React.FC = () => {
  return (
    <Layout>
      <p className="text-xl font-semibold">Create Task</p>
      <CreateFuelingTable />
    </Layout>
  );
};

export default CreateFueling;
