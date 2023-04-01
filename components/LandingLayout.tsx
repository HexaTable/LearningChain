import { Layout } from "antd";
import Navbar from "./Navbar";

const LandingLayout: React.FC = ({
  children,
}: React.PropsWithChildren<any>) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      {children}
    </Layout>
  );
};

export default LandingLayout;
