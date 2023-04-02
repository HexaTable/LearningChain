import { createElement, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { StarOutlined, MessageOutlined } from "@ant-design/icons";
import { List, Space } from "antd";

import DashboardLayout from "../../../components/DashboardLayout";
import withAuth from "../../../components/Auth/withAuth";

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);

interface CourseProps {
  id: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  category: string;
  numReviews: number;
}

const MineCourses = () => {
  const [courses, setCourses] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchCourses = async () => {
      const email = session?.user?.email;
      const response = await fetch(`/api/courses/user/${email}`, {
        method: "GET",
      });

      const data = await response.json();
      setCourses(data);
    };

    fetchCourses();
  }, [session]);

  return (
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
                text={course.numReviews.toString()}
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
              title={
                <a href={`/dashboard/courses/${course.id}`}>{course.name}</a>
              }
              description={course.description}
            />
          </List.Item>
        )}
      />
    </DashboardLayout>
  );
};

export default withAuth(MineCourses);
