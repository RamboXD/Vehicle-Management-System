import React from "react";
import { Layout } from "@/components";
import { TasksTable } from "./components";

const Tasks: React.FC = () => {
  return (
    <Layout>
      <p className="text-xl font-semibold">Tasks</p>
      <TasksTable />
    </Layout>
  );
};

export default Tasks;
