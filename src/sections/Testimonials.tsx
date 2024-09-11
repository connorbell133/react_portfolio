"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import React from "react";

// Dummy data for GitHub repositories
const repositories = [
  {
    name: "Repo One",
    commits: 120,
    owner: "Owner One",
    avatarUrl: "/path/to/avatar1.png", // Replace with actual paths or URLs
  },
  {
    name: "Repo Two",
    commits: 85,
    owner: "Owner Two",
    avatarUrl: "/path/to/avatar2.png",
  },
  {
    name: "Repo Three",
    commits: 150,
    owner: "Owner Three",
    avatarUrl: "/path/to/avatar3.png",
  },
  {
    name: "Repo Four",
    commits: 200,
    owner: "Owner Four",
    avatarUrl: "/path/to/avatar4.png",
  },
  {
    name: "Repo Five",
    commits: 95,
    owner: "Owner Five",
    avatarUrl: "/path/to/avatar5.png",
  },
  {
    name: "Repo Six",
    commits: 110,
    owner: "Owner Six",
    avatarUrl: "/path/to/avatar6.png",
  },
  {
    name: "Repo Seven",
    commits: 130,
    owner: "Owner Seven",
    avatarUrl: "/path/to/avatar7.png",
  },
  {
    name: "Repo Eight",
    commits: 140,
    owner: "Owner Eight",
    avatarUrl: "/path/to/avatar8.png",
  },
  {
    name: "Repo Nine",
    commits: 160,
    owner: "Owner Nine",
    avatarUrl: "/path/to/avatar9.png",
  },
];

const firstColumn = repositories.slice(0, 3);
const secondColumn = repositories.slice(3, 6);
const thirdColumn = repositories.slice(6, 9);

const RepositoryColumn = (props: {
  className?: string;
  repositories: typeof repositories;
  duration?: number;
}) => (
  <div className={props.className}>
    <motion.div
      animate={{
        translateY: "-50%",
      }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {props.repositories.map(({ name, commits, owner, avatarUrl }) => (
            <div className="card" key={name}>
              <div>{name}</div>
              <div className="flex items-center gap-2 mt-5">
                <Image
                  src={avatarUrl}
                  alt={owner}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="font-medium tracking-tight leading-5">
                    {owner}
                  </div>
                  <div className="leading-5 tracking-tight">
                    {commits} commits
                  </div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return (
    <section className="bg-white">
      <div className="container">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag">Repositories</div>
          </div>
          <h2 className="section-title mt-5">Our Top Repositories</h2>
          <p className="section-description mt-5">
            Explore our repositories and see how many commits each has
            contributed to.
          </p>
        </div>
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
          <RepositoryColumn repositories={firstColumn} duration={15} />
          <RepositoryColumn
            repositories={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <RepositoryColumn
            repositories={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};
