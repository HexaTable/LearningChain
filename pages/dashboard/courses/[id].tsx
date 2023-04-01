import DashboardLayout from "../../../components/DashboardLayout";

function Course({ id }: any) {
  return (
    <DashboardLayout>
      <h1>Course {id}</h1>
    </DashboardLayout>
  );
}

export default Course;
