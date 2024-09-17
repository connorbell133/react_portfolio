"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import GitHubIcon from "@/assets/github-logo.png";
import Link from "next/link";

// Dummy data for GitHub repositories
const repo_grabber = async () => {
  try {
    const response = await fetch("/api/github", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      if (data.repositories.length < 12) {
        return [...data.repositories, ...data.repositories];
      }
      return data.repositories;
    } else {
      console.error("Error generating response:", data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
interface Repository {
  id: number;
  owner: {
    login: string;
    avatar_url: string;
    starred_url: string;
  };
  html_url: string;
  url: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  topics: string[];

  // Add other relevant fields based on the data structure
}
const RepositoryColumn = (props: {
  className?: string;
  repositories: Repository[];
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
          {props.repositories.map(
            ({
              id,
              owner,
              html_url,
              url,
              stargazers_count,
              watchers_count,
              language,
              topics,
            }) => (
              <Link href={html_url} key={id}>
                <div className="card" key={id}>
                  <div>{owner.login}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <Image
                      src={GitHubIcon}
                      alt={owner.login}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">
                        {owner.login}
                      </div>
                      <div className="leading-5 tracking-tight">
                        {stargazers_count} stars
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await repo_grabber();
      if (Array.isArray(data)) {
        setRepos(data as Repository[]);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    };

    fetchData();
  }, []);
  const firstColumn = repos.slice(0, 3);
  const secondColumn = repos.slice(3, 6);
  const thirdColumn = repos.slice(6, 9);
  const fourthColumn = repos.slice(9, 12);

  return (
    <section className="bg-white">
      <div className="container py-20">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag">Repositories</div>
          </div>
          <h2 className="section-title mt-5">My Top Repositories</h2>
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
          <RepositoryColumn
            repositories={fourthColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};
