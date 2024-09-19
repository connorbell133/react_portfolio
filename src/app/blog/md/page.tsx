"use client";
import { useEffect, useState } from "react";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { useSearchParams } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ArticlePage() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const article = searchParams.get("article");

  const fetchContent = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("fetching article", article);
      const response = await fetch(`/api/blog/article`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article: article }), // Send the article ID to the API
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }

      const html = await response.json(); // Fetch response as text
      console.log(html.article.article); // Check the HTML structure

      setContent(html.article.article);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [article]);

  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <p>Loading article...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Markdown className="markdown" remarkPlugins={[remarkGfm]}>
            {content}
          </Markdown>
        )}
      </div>
      <Footer />
    </>
  );
}
