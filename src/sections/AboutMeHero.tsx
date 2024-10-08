"use client";
import headshotImage from "@/assets/headshot.jpeg";
import pyramidImage from "@/assets/pyramid.png";
import tubeImage from "@/assets/tube.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export const AboutMeHero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-20 overflow-x-clip"
    >
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title mb-20">About Me</h2>
        </div>
        <div className="relative">
          <div className="flex flex-col md:flex-row items-start justify-center">
            <div className="flex flex-col justify-center items-center w-full m:w-1/3">
              <Image
                src={headshotImage}
                alt="Headshot Image"
                className="rounded-full"
                width={250}
              />
              <h1 className="text-3xl font-bold mt-4">Connor Bell</h1>
              <p className="text-lg text-gray-600 text-center mt-4">
                <span> AI Engineer @ Accenture Security</span>
                <br />
                <span>Seattle, Wa</span>
              </p>
              <div className="mt-8">
                <Link href="https://www.linkedin.com/in/connorbell13/">
                  <button className="btn btn-primary">View LinkedIn</button>
                </Link>
              </div>
            </div>
            <div className="mt-5 sm:w-full m:w-1/2">
              <p className="text-lg text-gray-600">
                <span>
                  AI Solutions Engineer with a passion for building scalable,
                  AI-driven platforms that drive innovation and enhance
                  security. I specialize in Agentic Systems, RAG, Cloud
                  Applications, and Multi-Model Systems.
                </span>
                <br />
                <br />
                <span>
                  With experience in Backend Development, Agentic AI, and
                  Complex RAG Systems, I am confident in my ability to make a
                  meaningful impact in the everchanging world of AI.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
