import { useState } from "react";
import { Pagination } from "antd";

import CourseInfo from "../CourseInfo";

const AllCourses = ({ courses }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);

  const handlePageChange = (page: number) => {
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
          <CourseInfo course={course} key={course.id} />
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
    </div>
  );
};

export default AllCourses;
