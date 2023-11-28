import React from "react";
import { Layout } from "@/components";
import { UnTasksTable } from "../components/UnTasksTable";

const UnTasks: React.FC = () => {
  return (
    <Layout>
      <p className="text-xl font-semibold">Unassigned Tasks</p>
      <UnTasksTable />
    </Layout>
  );
};

export default UnTasks;
