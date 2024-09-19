import React from "react";

interface BlogPost {
  date: string;
  title: string;
  href: string;
  tags: string[];
  description: string;
}

interface BlogMenuProps {
  blogPosts: BlogPost[];
}

export const BlogMenu: React.FC<BlogMenuProps> = ({ blogPosts }) => {
  return (
    <section className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[#EAEEFE] overflow-x-clip text-white">
      <div className="container mx-auto">
        <div className="flex flex-row gap-8 justify-center">
          {/* Sidebar */}
          <div className="hidden md:block w-1/6 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#4F4D55]">Categories</h3>
            <ul className="mt-4">
              {[
                { label: "genai", count: 2 },
                { label: "LLM", count: 1 },
                { label: "SQL", count: 1 },
                { label: "Substrate", count: 1 },
                { label: "chatbot", count: 1 },
                { label: "site", count: 1 },
              ].map((category, idx) => (
                <li key={idx} className="my-2">
                  <a
                    href={`/tags/${category.label}`}
                    className="text-[16px] text-start tracking-tighter font-semibold text-[#4F4D55]"
                  >
                    {category.label} ({category.count})
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Posts */}
          <div className="flex flex-col w-full md:w-1/2">
            <ul>
              {blogPosts.map((post, idx) => (
                <li key={idx} className="mb-8">
                  <article href={post.href} className="rounded-lg p-6">
                    <dl className="mb-1">
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-[#4F4D55]/80">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString()}
                        </time>
                      </dd>
                    </dl>
                    <h2 className="text-xl text-start tracking-tighter font-semibold text-[#4F4D55] mb-1">
                      <a href={post.href} className="hover:underline">
                        {post.title}
                      </a>
                    </h2>
                    <div className="flex flex-wrap space-x-3 mb-1">
                      {post.tags.map((tag, index) => (
                        <a
                          key={index}
                          href={`/tags/${tag}`}
                          className="text-sm text-[#4F4D55] hover:text-primary-400"
                        >
                          {tag}
                        </a>
                      ))}
                    </div>
                    <p className="text-gray-300">{post.description}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
