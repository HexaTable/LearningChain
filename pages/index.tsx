import React from "react";
import { GetStaticProps } from "next";
import Navbar from "../components/Navbar";
import Metamask from "../components/MetamaskButton";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const Index = () => {
  return (
    <>
      <Navbar />
      <Metamask />
    </>
  );
};

export default Index;
