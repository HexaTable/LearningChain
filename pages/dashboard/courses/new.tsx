import React from "react";
import { Button, Form, Input, Row, Space } from "antd";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Layout } from "antd";

import { UploadOutlined } from "@ant-design/icons";

function New() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Form
          {...layout}
          name="nest-messages"
          className="mt-8 py-1"
          style={{ maxWidth: 800 }}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Row className="text-extrabold text-3xl my-3 mx-6">New Course</Row>
          <Space />
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "value"]}
            label="Value"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["user", "introduction"]} label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name={["user", "introduction"]} label="Image">
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </Layout>
  );
}

export default New;
