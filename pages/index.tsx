import React from "react";
import { GetStaticProps } from "next";
import Header from "../components/Header";

import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const Index = () => {
  return (
    <>
      <Header />
    </>
  );
};

export default Index;
