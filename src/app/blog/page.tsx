"use client";
import { useEffect, useState } from "react";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { BlogMenu } from "@/sections/BlogMenu";
import { url } from "inspector";

export default function About() {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);

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
          tags: ["test"], //fake tages
          description: "this and that",
        }));

        setBlogPosts(articles); // Replace blog posts with fetched articles
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <Header />

      {loading ? (
        <p>Loading articles...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <BlogMenu blogPosts={blogPosts} />
      )}

      <Footer />
    </>
  );
}
