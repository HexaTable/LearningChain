import Navbar from "../components/Navbar/Navbar";
import { List, Card, Typography, Pagination, Layout } from "antd";
import { useState } from "react";
import coursesData from "../data/courses.json";
import CategoryFilter from "../components/CategoryList";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Explore = ({ children }:any) => {
  function CourseList() {
    const CourseItem = ({ course }:any) => (
      <div className="w-1/4 px-4 mb-8">
        <Card
          hoverable
          cover={
            <img
              alt={course.title}
              src={course.image}
              className="w-200 h-100"
            />
          }
        >
          <Card.Meta title={course.title} description={course.description} />
          <div className="mt-4 flex justify-between items-center">
            <span>{course.category}</span>
            <span>{course.price}</span>
          </div>
        </Card>
      </div>
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [courses, setCourses] = useState(
      coursesData
        .slice()
        .sort((a, b) => b.num_reviews - a.num_reviews)
        .slice(0, 20)
    );

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const indexOfLastCourse = currentPage * pageSize;
    const indexOfFirstCourse = indexOfLastCourse - pageSize;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Popular Courses</h1>
        <div className="flex flex-wrap -mx-4">
          {currentCourses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={courses.length}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
        <CategoryFilter courses={coursesData} />
      </div>
    );
  }

  return (
    <Layout>
      <Header>
        <Navbar></Navbar>
      </Header>

      <Content className="mt-8" style={{ padding: "0 50px" }}>
        <CourseList />
      </Content>
    </Layout>
  );
};

export default Explore;
