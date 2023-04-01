import { createElement } from "react";
import { GetServerSideProps } from "next";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
import { List, Space } from "antd";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";

import prisma from "../../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async () => {
  const courses = await prisma.course.findMany();
  // Refer to this issue: https://github.com/vercel/next.js/issues/13209#issuecomment-633149650
  const parsedCourses = JSON.parse(JSON.stringify(courses));

  // Add author name to each course
  const newCourses = parsedCourses.map(async (course) => {
    const author = await prisma.user.findUnique({
      where: {
        id: course.authorId,
      },
    });

    return {
      ...course,
      author_name: author.name,
    };
  });

  return {
    props: {
      courses: await Promise.all(newCourses),
    },
  };
};

interface CourseProps {
  name: string;
  description: string;
  author_id: string;
  author_name: string;
  rating: number;
  price: number;
  category: string;
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

const ListCourses: React.FC = ({ courses }: any) => (
  <DashboardLayout>
    <List
      itemLayout="vertical"
      size="large"
      style={{ width: "100%" }}
      pagination={{
        pageSize: 4,
      }}
      dataSource={courses}
      renderItem={(course: CourseProps) => (
        <List.Item
          key={course.name}
          actions={[
            <IconText
              icon={StarOutlined}
              text={course.rating.toFixed(1)}
              key="list-vertical-stars"
            />,
            <IconText
              icon={MessageOutlined}
              text={getRandomInt(0, 10).toString()}
              key="list-vertical-messages"
            />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            title={<a href={"/"}>{course.name}</a>}
            description={course.description}
          />
          Created by: {course.author_name}
        </List.Item>
      )}
    />
  </DashboardLayout>
);

export default ListCourses;
