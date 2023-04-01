import React from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Row, Space, Layout } from "antd";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";

function NewCourse() {
  const router = useRouter();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = async (values: any) => {
    try {
      await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(values),
      });

      // router.push("/dashboard/courses");
    } catch (error) {
      console.error(error);
    }
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

          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input />
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
