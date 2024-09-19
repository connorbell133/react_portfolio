"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GitHubIcon from "@/assets/github-logo.png";
import Link from "next/link";

interface Repository {
  id: number;
  name: string;
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
  description: string;
  // Add other relevant fields based on the data structure
}
const RepoCard = (repo_temp: Repository) => (
  <div className="card p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-lg max-w-sm flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
        {repo_temp.name}
      </h2>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {Array.isArray(repo_temp.topics) && repo_temp.topics.length > 0 ? (
          repo_temp.topics.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-sm text-blue-800 font-semibold rounded-full shadow-inner transition-colors duration-200 hover:bg-blue-200"
            >
              {tech}
            </span>
          ))
        ) : (
          <div className="text-sm text-gray-500">No technologies available</div>
        )}
      </div>
      <p className="text-gray-700 text-base leading-relaxed mb-6">
        {repo_temp.description}
      </p>
    </div>
    <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-200">
      <Link href={repo_temp.html_url}>
        <button className="btn btn-primary bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
          View Repo
        </button>
      </Link>
      {repo_temp.html_url && (
        <button className="btn btn-transparent text-blue-600 font-semibold flex items-center align-middle">
          <span className="hover:underline ">Read Article</span>
          <span className="ml-1 text-xl">→</span>
        </button>
      )}
    </div>
  </div>
);

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
      console.log("Data:", data);
      return data.repositories;
    } else {
      console.error("Error generating response:", data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const GithubShowcase = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await repo_grabber();
      if (Array.isArray(data)) {
        setRepos(data as Repository[]); // Ensure data is typed correctly
      } else {
        console.error("Fetched data is not an array:", data);
      }
    };

    fetchData();
  }, []);
  return (
    <section className="py-24 bg-gray-50" id="project-showcase">
      <div className="container mx-auto px-4">
        <div className="section-heading text-center">
          <h3 className="tag text-blue-500 font-medium uppercase">Showcase</h3>
          <h2 className="section-title text-4xl font-bold text-gray-900 mt-4">
            GitHub Repositories
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {repos.map((repo, index) => (
            <RepoCard key={index} {...repo} />
          ))}
        </div>
      </div>
    </section>
  );
};
