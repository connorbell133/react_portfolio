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
    <section className="pt-12 pb-24 bg-[#EAEEFE]">
      <div className="container mx-auto">
        <div className="flex flex-row gap-10 justify-center">
          {/* Sidebar */}
          <div className="hidden md:block w-1/6 p-6">
            {/* Add sidebar content here if needed */}
          </div>
          {/* Blog posts */}
          <div className="w-full md:w-5/6">
            <ul className="space-y-12">
              {blogPosts.map((post, idx) => (
                <li key={idx} className="group">
                  <a
                    href={post.href}
                    className="block p-5 rounded-xl transition duration-300 hover:shadow-lg hover:bg-gray-100"
                  >
                    <article className="space-y-4">
                      <dl className="text-sm text-gray-500">
                        <dt className="sr-only">Published on</dt>
                        <dd>{post.date}</dd>
                      </dl>
                      <h2 className="text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition duration-300">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {post.description}
                      </p>
                      <div className="mt-4 space-x-2">
                        {post.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="inline-block text-xs font-medium text-white bg-[#4F4D55] px-3 py-1 rounded-full"
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
