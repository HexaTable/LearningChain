import React from "react";
import { Button, Form, Input, Row, Space, Layout, Avatar } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import DashboardLayout from "../../../components/DashboardLayout";
import withAuth from "../../../components/Auth/withAuth";

function EditUser() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: any) => {
    console.log(values);
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
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name={["user", "username"]} label="Username">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name={["user", "introduction"]} label="Avatar">
            <Space wrap size={16}>
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
            </Space>
            <div className="mt-3">
              {" "}
              <Button icon={<UploadOutlined />}>Upload</Button>{" "}
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#002140" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </DashboardLayout>
  );
}

export default withAuth(EditUser);
