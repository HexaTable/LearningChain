import DashboardLayout from "../../../components/DashboardLayout";
import { Button, Space, Tag } from "antd";

function Course({ id }: any) {

  const enrolled: boolean = false;

  return (

    <DashboardLayout>
      <div className="mx-8 mt-2 w-full">
        <h1 className="text-3xl">Course {id}</h1>
        <hr className="my-2"></hr>
        <Space className="my-3" size={[0, 8]} wrap>
          <Tag color="cyan">Web3</Tag>
          <Tag color="orange">Education</Tag>
          <Tag color="red">Gaming</Tag>
        </Space>
        <h2 className="text-2xl">Description</h2>
        <p>Very long describing text about the Course</p>
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
        >
          {enrolled ? ("Enrolled") : ("Enroll")}
        </Button>
      </div>

    </DashboardLayout>
  );
}

export default Course;
