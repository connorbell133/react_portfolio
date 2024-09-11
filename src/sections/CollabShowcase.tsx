import React from "react";
import Image from "next/image";
type CollabCardProps = {
  name: string;
  description: string;
  technologies: string[];
  githubLink: string;
  articleLink?: string;
};

const CollabCard = ({
  name,
  description,
  technologies,
  githubLink,
  articleLink,
}: CollabCardProps) => (
  <div className="card p-6 bg-white rounded-lg shadow-lg max-w-sm flex flex-col justify-between transition-transform transform hover:scale-105 duration-300">
    <div className="flex flex-col">
      <Image
        src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*kXT6_6NvHT8UWVzn.png"
        width={720}
        height={480}
        alt="JournalPal"
        className="rounded-2xl mb-4"
      />
      <h2 className="text-2xl mx-auto font-bold text-gray-900 mb-4">{name}</h2>

      <p className="text-gray-600 text-center text-base leading-relaxed mb-6">
        {description}
      </p>
    </div>
    <div className="mt-auto flex justify-between items-center pt-4">
      <button className="btn btn-primary">View Collab</button>
      {articleLink && (
        <button className="btn btn-transparent">
          Read Article <span className="ml-1">→</span>
        </button>
      )}
    </div>
  </div>
);

export const CollabShowcase = () => {
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
            Collab Showcase
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {repos.map((repo, index) => (
            <CollabCard
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
