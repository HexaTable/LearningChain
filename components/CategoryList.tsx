import React, { useState } from 'react';
import { List, Card, Typography, Pagination, Select } from 'antd';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const CategoryList = ({ courses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = courses.reduce((acc, course) => {
    if (!acc.includes(course.category)) {
      acc.push(course.category);
    }
    return acc;
  }, []);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const filteredCourses = selectedCategory ? courses.filter((course) => course.category === selectedCategory) : courses;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastCourse = currentPage * pageSize;
  const indexOfFirstCourse = indexOfLastCourse - pageSize;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-bold ml-4">{selectedCategory ? `Courses in ${selectedCategory}` : 'Search Courses'}</h1>
        <Select className="ml-4" style={{ width: 200 }} placeholder="Select a category" onChange={handleCategoryChange}>
          <Option value="">All categories</Option>
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </div>
      <div className="flex flex-wrap -mx-4">
        {currentCourses.map((course) => (
          <div key={course.id} className="w-1/4 px-4 mb-8">
            <Card hoverable cover={<img alt={course.title} src={course.image} />}>
              <Card.Meta title={course.title} description={course.description} />
              <div className="mt-4 flex justify-between items-center">
                <span>{course.category}</span>
                <span>{course.price}</span>
              </div>
            </Card>
          </div>
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

export default CategoryList;