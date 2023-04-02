import { GetServerSideProps } from "next";

import LandingLayout from "../components/LandingLayout";
import CategorizedCourses from "../components/Courses/CategorizedCourses";
import AllCourses from "../components/Courses/AllCourses";

import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async () => {
  const courses = await prisma.course.findMany();
  // Refer to this issue: https://github.com/vercel/next.js/issues/13209#issuecomment-633149650
  const parsedCourses = JSON.parse(JSON.stringify(courses));

  const categories = await prisma.category.findMany();
  const parsedCategories = JSON.parse(JSON.stringify(categories));

  return {
    props: {
      courses: await Promise.all(parsedCourses),
      categories: await Promise.all(parsedCategories),
    },
  };
};

const Explore = ({ courses, categories }: any) => {
  return (
    <LandingLayout>
      <AllCourses courses={courses} />
      <CategorizedCourses courses={courses} categories={categories} />
    </LandingLayout>
  );
};

export default Explore;
