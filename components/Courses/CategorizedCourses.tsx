import React, { useState } from "react";
import { Pagination, Select } from "antd";
import CourseInfo from "../CourseInfo";

const { Option } = Select;

const CategorizedCourses = ({ courses, categories }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState<any>();

  const getSelectedCategoryName = categories.find(
    (category: any) => category.id === selectedCategory
  )?.name;

  const handleCategoryChange = (value: any) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const filteredCourses = selectedCategory
    ? courses.filter((course: any) => course.categoryId === selectedCategory)
    : courses;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastCourse = currentPage * pageSize;
  const indexOfFirstCourse = indexOfLastCourse - pageSize;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-bold ml-4">
          {selectedCategory
            ? `Courses in ${getSelectedCategoryName}`
            : "Search Courses"}
        </h1>
        <Select
          className="ml-4"
          style={{ width: 200 }}
          placeholder="Select a category"
          onChange={handleCategoryChange}
        >
          <Option value="">All categories</Option>
          {categories.map((category: { id: string; name: string }) => (
            <Option value={category.id} key={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </div>

      <div className="flex flex-wrap -mx-4">
        {currentCourses.map((course: any) => (
          <CourseInfo course={course} key={course.id} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredCourses.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default CategorizedCourses;
