import LandingLayout from "../components/LandingLayout";

import CategorizedCourses from "../components/Courses/CategorizedCourses";
import AllCourses from "../components/Courses/AllCourses";

import coursesData from "../data/courses.json";

const Explore = () => {
  return (
    <LandingLayout>
      <AllCourses />
      <CategorizedCourses courses={coursesData} />
    </LandingLayout>
  );
};

export default Explore;
