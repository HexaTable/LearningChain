import React from "react";
import { Button, Form, Input, Row, Space, Layout } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";

function NewCourse() {
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
    </DashboardLayout>
  );
}

export default NewCourse;
