import React from "react";
import { GetStaticProps } from "next";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { Layout } from "antd";

const { Footer } = Layout;

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
              <Link key="/api/auth/signin" href="/api/auth/signin">
                <a>
                  <p className="w-1/2 mx-auto bg-primary text-white font-bold text-center text-bold text-3xl py-5 px-2 rounded-lg">
                    Join Us!
                  </p>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primary mt-12 overflow-hidden h-96">
        <div className="container mx-auto mb-10">
          <div className="flex flex-wrap justify-center mt-8">
            <div className="w-1/2 mx-auto">
              <h1 className="text-white text-center text-xl font-extrabold">
                Create and Learn
              </h1>
              <div className="flex flex-wrap">
                <div className="container mx-auto w-f text-white mt-3">
                  <p className="text-center">
                    Start, switch, or advance your career with more than 5,400
                    courses, professional certificates, and degrees from
                    world-class universities and companies.
                  </p>
                  <p className="text-center mt-4">
                    Or maybe create your own course and help teach other people
                    in the vast areas you are proficient at.
                  </p>
                </div>
              </div>
              <Link key="/explore" href="/explore">
                <a>
                  <p className="w-1/2 mx-auto bg-white text-primary font-bold text-center text-bold text-xl mt-16 py-5 px-2 rounded-lg">
                    Explore Courses
                  </p>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white mt-12 overflow-hidden h-full">
        <div className="container mx-auto mb-20">
          <div className="flex flex-wrap justify-center mt-8">
            <div className="w-1/2 mx-auto">
              <h1 className="text-primary text-center text-xl font-extrabold">
                Our Philosphy
              </h1>
              <div className="flex flex-wrap">
                <div className="container mx-auto w-f text-primary mt-3">
                  <p className="text-center">
                    We believe education is one of the most aspects when it
                    comes to being a member of society. With that philosophy and
                    technologies like Web3 and Blockchain being normalized more
                    and more we believe its the time for Web3 to reach
                    Education.
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer> LearningChain™️ - BugsByte2023 - HexaTable</Footer>
    </>
  );
};

export default Index;
