import React from "react";
import { GetStaticProps } from "next";
import Navbar from "../components/Navbar";
import Link from "next/link";


export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const Index = () => {
  return (
    <>
      <Navbar />
      <section className="bg-white mt-12 overflow-hidden">
        <div className="container mx-auto mb-20">
          <div className="flex flex-wrap justify-center">
            <div className="ml-auto mr-auto mt-20 w-full px-12 md:w-5/12 md:px-4">
              <h1 className="mb-1 text-7xl font-extrabold leading-normal text-primary text-center">
                LearningChain
              </h1>
              <h2 className="mt-2 mb-4 text-4xl font-light leading-relaxed text-primary text-center">
                Peer to peer learning of the future.
              </h2>
              <Link href={"/api/auth/login"} >
                <p className="w-1/2 mx-auto bg-primary text-white font-bold text-center text-bold text-3xl py-5 px-2 rounded-lg">
                  Join Us!</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primary mt-12 overflow-hidden h-96">
        <div className="container mx-auto mb-20">
          <div className="flex flex-wrap justify-center mt-8">
            <div className="w-1/3">
              <h1 className="text-white text-xl font-extrabold">Blockchain</h1>
            </div>
            <div className="w-2/3">
              <h1 className="text-white text-xl font-extrabold">Create and Learn</h1>
              <div className="flex flex-wrap">
                <div className="w-2/3 text-white mt-3">
                  <p>Start, switch, or advance your career with more than 5,400 courses, Professional Certificates, and degrees from world-class universities and companies.</p>
                  <p className="mt-2">Or maybe create your own course and help teach other people in the vast areas you are profeciante at.</p>
                </div>
                <div className="w-1/3 text-white">
                  Image
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white mt-12 overflow-hidden h-96">
        <div className="container mx-auto mb-20">
          <div className="flex flex-wrap justify-center mt-8">
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
