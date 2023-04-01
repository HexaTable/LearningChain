import React from "react";
<<<<<<< HEAD
import { Button, Form, Row, Space, Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import DashboardLayout from "../../../components/DashboardLayout";
import { useSession } from "next-auth/react";

function User() {
  const { data: session } = useSession();

  const onFinish = (values: any) => {
    console.log(values);
  };
=======
import { Button, Form, Input, Row, Space, Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import { useSession } from "next-auth/react";

function User() {
  const { data: session, status } = useSession();
>>>>>>> main

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
  };
  /* eslint-enable no-template-curly-in-string */

<<<<<<< HEAD
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
            <p>{session.user.name}</p>
          </Form.Item>
          <Form.Item name={["user", "email"]} label="Email">
            <p>{session.user.email}</p>
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
              <Button className="ml-8" href="/dashboard/profile/edit">
                Log Out
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Layout>
    </DashboardLayout>
  );
=======
  const onFinish = (values: any) => {
    console.log(values);
  };

  if (session) {
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
            <Row className="text-extrabold text-3xl my-3 mx-6">
              User Profile
            </Row>
            <Space />
            <Form.Item name={["user", "name"]} label="Name">
              <p>{session.user.name}</p>
            </Form.Item>
            <Form.Item name={["user", "email"]} label="Email">
              <p>{session.user.email}</p>
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
                <Button className="ml-8" href="/dashboard/profile/edit">
                  Log Out
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Layout>
      </DashboardLayout>
    );
  } else {
    return (
      <DashboardLayout>
        <Layout>
          <h1>Log In</h1>
          <Button href="/api/auth/signin">Sign In</Button>
        </Layout>
      </DashboardLayout>
    );
  }
>>>>>>> main
}

export default User;
