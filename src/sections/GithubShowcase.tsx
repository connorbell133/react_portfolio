import Image from "next/image";
import React from "react";

type RepoCardProps = {
  name: string;
  description: string;
  technologies: string[];
  githubLink: string;
  articleLink?: string;
};

const RepoCard = ({
  name,
  description,
  technologies,
  githubLink,
  articleLink,
}: RepoCardProps) => (
  <div className="card p-6 bg-white rounded-lg shadow-lg max-w-sm flex flex-col justify-between transition-transform transform hover:scale-105 duration-300">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{name}</h2>
      <div className="flex items-center gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-sm text-gray-800 rounded-full shadow-inner"
          >
            {tech}
          </span>
        ))}
      </div>
      <p className="text-gray-600 text-base leading-relaxed mb-6">
        {description}
      </p>
    </div>
    <div className="mt-auto flex justify-between items-center pt-4">
      <button className="btn btn-primary">View Repo</button>
      {articleLink && (
        <button className="btn btn-transparent">
          Read Article <span className="ml-1">→</span>
        </button>
      )}
    </div>
  </div>
);

export const GithubShowcase = () => {
  const repos = [
    {
      name: "JournalPal",
      description:
        "Talk with your AI friend through messaging to journal without opening a notebook.",
      technologies: ["🐍 Python", "🤖 GenAI", "💡 LLM"],
      githubLink: "https://github.com/journalpal",
      articleLink: "https://medium.com/journalpal-article",
    },
    {
      name: "CodeHelper",
      description:
        "A bot that helps you write code by generating snippets based on natural language.",
      technologies: ["🖥️ JavaScript", "⚛️ React", "🧠 NLP"],
      githubLink: "https://github.com/codehelper",
      articleLink: "https://medium.com/codehelper-article",
    },
    {
      name: "SecureGuard",
      description:
        "AI-powered tool for real-time security threat detection and prevention.",
      technologies: ["🛡️ Security", "🤖 AI", "🚀 FastAPI"],
      githubLink: "https://github.com/secureguard",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="section-heading text-center">
          <h3 className="tag text-blue-500 font-medium uppercase">Showcase</h3>
          <h2 className="section-title text-4xl font-bold text-gray-900 mt-4">
            GitHub Repositories
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {repos.map((repo, index) => (
            <RepoCard
              key={index}
              name={repo.name}
              description={repo.description}
              technologies={repo.technologies}
              githubLink={repo.githubLink}
              articleLink={repo.articleLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
