import React from "react";
import { Button, Form, Row, Space, Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import DashboardLayout from "../../../components/DashboardLayout";
import { useSession } from "next-auth/react";
import MetaMaskButton from "../../../components/MetaMaskButton";

function User() {
  const { data: session } = useSession();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
  };
  /* eslint-enable no-template-curly-in-string */

  return (
    <DashboardLayout>
      <Layout>
        <Form
          {...layout}
          name="nest-messages"
          className="mt-8 py-1"
          style={{ maxWidth: 800 }}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Row className="text-extrabold text-3xl my-3 mx-6">User Profile</Row>
          <Form.Item name={["user", "name"]} label="Name" className="mb-4">
            <p>{session?.user.name}</p>
          </Form.Item>
          <Form.Item name={["user", "email"]} label="Email" className="mb-4">
            <p>{session?.user.email}</p>
          </Form.Item>
          <Form.Item
            name={["user", "username"]}
            label="Username"
            className="mb-4"
          ></Form.Item>
          <Form.Item
            name={["user", "introduction"]}
            label="Image"
            className="mb-8"
          >
            <Space wrap size={16}>
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
            </Space>
          </Form.Item>
          <div className="flex items-center mb-16 ml-32">
            <p className="ml-16">Wallet:</p>
            <MetaMaskButton className="bg-blue-500 hover:bg-blue-800 ml-2" />
          </div>
          <Form.Item>
            <div className="flex flex-wrap">
              <Button className="ml-64" href="/dashboard/profile/edit">
                Edit Profile
              </Button>
              <Button className="ml-8" href="/dashboard/profile/edit">
                Log Out
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Layout>
    </DashboardLayout>
  );
}

export default User;
