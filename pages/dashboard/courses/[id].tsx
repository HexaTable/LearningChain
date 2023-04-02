import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { Button, Skeleton, Space, Tag } from "antd";
import DashboardLayout from "../../../components/DashboardLayout";
import withAuth from "../../../components/Auth/withAuth";

function Course() {
  const [course, setCourse] = useState(null);
  const [bought, setBought] = useState(false);

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    async function fetchCourse() {
      const id = router.query.id;
      const response = await fetch(`/api/courses/${id}`);
      const data = await response.json();
      setCourse(data);
    }

    fetchCourse();
  }, [router.query.id]);

  const buyCourse = async () => {
    const id = router.query.id;
    const body = {
      courseId: id,
      email: session?.user?.email,
    };

    await fetch(`/api/courses/buy`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    setBought(true);
  };

  if (!course) {
    return <Skeleton active />;
  }

  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  return (
    <DashboardLayout>
      <div className="mx-8 mt-2 w-full">
        <h1 className="text-3xl">{course.name}</h1>

        <hr className="my-2" />

        <Space className="my-3" size={[0, 8]} wrap>
          <Tag color={randomColor} key={course.category}>
            {course.category.name}
          </Tag>
        </Space>

        <h2 className="text-2xl">Description</h2>
        <p>{course.description}</p>

        <img
          width={272}
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          className="my-3"
        />

        <Button
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: "#002140" }}
          onClick={() => buyCourse()}
        >
          {bought ? "Bougth" : "Buy"}
        </Button>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(Course);
