import { useState } from "react";
import { Pagination } from "antd";

import CourseInfo from "../CourseInfo";

import coursesData from "../../data/courses.json";

const AllCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, _setPageSize] = useState(4);
  const [courses, _setCourses] = useState(
    coursesData
      .slice()
      .sort((a, b) => b.num_reviews - a.num_reviews)
      .slice(0, 20)
  );

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
