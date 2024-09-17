"use client";
import headshotImage from "@/assets/headshot.jpeg";
import pyramidImage from "@/assets/pyramid.png";
import tubeImage from "@/assets/tube.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
                <button className="btn btn-primary">Download CV</button>
              </div>
            </div>
            <div className="mt-5 sm:w-full m:w-1/2">
              <p className="text-lg text-gray-600">
                <span>
                  Connor is a driven and skilled Software Engineer who is
                  passionate about using my technical expertise and industry
                  knowledge to create applications and software that simplify
                  and enhance the lives of commercial businesses and consumers.
                </span>
                <br />
                <br />
                <span>
                  With a focus on Back end Development, cyber threat resilience,
                  and Generative AI, I am confident in my ability to make a
                  meaningful impact in our ever changing world today.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
