import { Layout } from "antd";
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
    </Layout>
  );
};

export default Dashboard;
