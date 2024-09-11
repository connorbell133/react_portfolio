"use client";
import ArrowIcon from "@/assets/arrow-right.svg";
import cogImage from "@/assets/cog.png";
import cylinderImage from "@/assets/cylinder.png";
import noodleImage from "@/assets/noodle.png";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const sections = [
    "Project Showcase",
    "Collab Showcase",
    "Articles",
    "About Us",
  ];
  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
    >
      <div className="container">
        <div className="md:flex items-top md:mt-4 lg:mt-20 md:h-[648px]">
          {/* Left Section */}
          <div className="md:w-[478px]">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              Portfolio
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              My portfolio is a showcase of my work, skills, and experience. It
              is a way to demonstrate what I can do and what I have achieved.
            </p>
            <div className="flex gap-2 items-center mt-[30px]">
              <button className="btn btn-primary">Get for free</button>
              <button className="btn btn-text flex items-center gap-1">
                <span>Learn more</span>
                <ArrowIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:flex-1 items-center mt-10 md:mt-0 lg:mt-6">
            {sections.map((section, index) => (
              <h2
                key={index}
                className="text-5xl md:text-5xl font-bold tracking-tighter mt-9 text-right"
              >
                {section}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
