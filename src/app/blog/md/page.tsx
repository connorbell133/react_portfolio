"use client";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import loadingGif from "@/assets/loading-gif.gif";
import Image from "next/image";
const Markdown = dynamic(() => import("react-markdown"), { ssr: false });

function ArticleContent() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const article = searchParams.get("article");

  const fetchContent = useCallback(async () => {
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
  }, [article]);

  useEffect(() => {
    if (article) {
      fetchContent();
    }
  }, [article, fetchContent]);

  if (loading) {
    return (
      <div className="w-full items-center m-auto flex flex-col py-10">
        <Image src={loadingGif} alt="Loading" className="w-1/6" />
        <p>Loading, please wait...</p>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (!content) return <div>No content available</div>;

  return (
    <Markdown className="markdown" remarkPlugins={[remarkGfm]}>
      {content}
    </Markdown>
  );
}

export default function ArticlePage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <ArticleContent />
      </Suspense>
      <Footer />
    </>
  );
}
