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
      const response = await fetch(`/api/blog/article`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article: article }), // Send the article ID to the API
      });

      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }

      const html = await response.json();
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
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            <p className="ml-4 text-gray-600 text-lg">Loading article...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-red-500 text-lg mb-4">
              Oops! There was an error: {error}
            </p>
            <button
              onClick={fetchContent}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="prose prose-lg max-w-full mx-auto mt-8">
            <Markdown className="markdown" remarkPlugins={[remarkGfm]}>
              {content}
            </Markdown>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
