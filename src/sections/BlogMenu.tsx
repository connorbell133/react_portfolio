import React from "react";

interface BlogPost {
  title: string;
  href: string;
  url: string;
  date: string;
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
            {/* Sidebar content */}
          </div>
          {/* Blog posts */}
          <div className="w-full md:w-5/6">
            <ul>
              {blogPosts.map((post, idx) => (
                <li key={idx} className="mb-8">
                  <a href={post.href} className="block rounded-lg p-6">
                    <article>
                      <dl className="mb-1">
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-[#4F4D55]/80">{post.date}</dd>
                      </dl>
                      <h2 className="text-2xl font-bold">{post.title}</h2>
                      <p className="mt-2">{post.description}</p>
                      <div className="mt-4">
                        {post.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="mr-2 bg-gray-200 text-gray-800 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
