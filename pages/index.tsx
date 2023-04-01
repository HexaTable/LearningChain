import React from "react";
import { GetStaticProps } from "next";
import Navbar from "../components/Navbar/Navbar";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const Index = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default Index;
