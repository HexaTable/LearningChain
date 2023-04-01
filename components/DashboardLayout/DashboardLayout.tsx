import { Layout } from "antd";
import Sidebar from "../Sidebar/Sidebar";

const DashboardLayout: React.FC = ({
  children,
}: React.PropsWithChildren<any>) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      {children}
    </Layout>
  );
};

export default DashboardLayout;
