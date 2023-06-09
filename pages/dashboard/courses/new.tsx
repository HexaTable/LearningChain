import React from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Row, Space, Layout, Select } from "antd";

import { notifySuccess, notifyError } from "../../../components/Notify";
import DashboardLayout from "../../../components/DashboardLayout";
import withAuth from "../../../components/Auth/withAuth";
import { GetServerSideProps } from "next";

import prisma from "../../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await prisma.category.findMany();
  const parsedCategories = JSON.parse(JSON.stringify(categories));

  return {
    props: {
      categories: await Promise.all(parsedCategories),
    },
  };
};

function NewCourse({ categories }: any) {
  const router = useRouter();

  // Create course
  const onFinish = async (values: any) => {
    try {
      await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(values),
      });

      notifySuccess("Info", "Course created");
      router.push("/dashboard/courses");
    } catch (error) {
      notifyError("Error", "It was not possible to create the course");
    }
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
      <div className="mx-8 mt-2 w-full">
        <Layout>
          <Form
            {...layout}
            className="mt-8 py-1"
            style={{ maxWidth: 800 }}
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Row className="text-extrabold text-3xl my-3 mx-6">New Course</Row>
            <hr className="my-2"></hr>
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
              <Select placeholder="Select a category">
                {categories.map((category: any) => (
                  <Select.Option key={category.id} value={category.name}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <Input />
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
      </div>
    </DashboardLayout>
  );
}

export default withAuth(NewCourse);
