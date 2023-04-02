import React from "react";
import { Button, Form, Row, Space, Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import DashboardLayout from "../../../components/DashboardLayout";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

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

  const router = useRouter();

  const logout = async () => {
    await signOut();
    router.push("/");
  };

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
          <Space />
          <Form.Item name={["user", "name"]} label="Name">
            <p>{session?.user.name}</p>
          </Form.Item>
          <Form.Item name={["user", "email"]} label="Email">
            <p>{session?.user.email}</p>
          </Form.Item>
          <Form.Item name={["user", "username"]} label="Username"></Form.Item>
          <Form.Item name={["user", "introduction"]} label="Image">
            <Space wrap size={16}>
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
            </Space>
          </Form.Item>
          <Form.Item>
            <div className="flex flex-warp">
              <Button className="ml-64" href="/dashboard/profile/edit">
                Edit Profile
              </Button>
              <Button className="ml-8" href="/" onClick={logout}>
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
