"use client";
import { useEffect, useState } from "react";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { BlogMenu } from "@/sections/BlogMenu";

type BlogPost = {
  title: string;
  href: string;
  url: string;
  date: string;
  tags: string[];
  description: string;
};

export default function About() {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch the articles from the API on page load
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/blog/list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "list" }), // Replace this with actual data
        });

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const result = await response.json();
        // Assuming the API response structure includes `articles`
        const articles = result.articles.map((article: any) => ({
          title: article.title,
          href: article.href,
          url: article.url,
          date: "2021-01-01", // Replace with actual date
          tags: article.tags || [], // Ensure tags are included
          description: article.description || "", // Ensure description is included
        }));

        setBlogPosts(articles); // Replace blog posts with fetched articles
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <Header />
      <BlogMenu blogPosts={blogPosts} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {blogPosts.map((post) => (
          <div key={post.href}>
            <h2>{post.title}</h2>
            <a href={post.href}>{post.url}</a>
            <p>{post.date}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
