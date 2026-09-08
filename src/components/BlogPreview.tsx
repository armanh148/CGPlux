"use client";

import BlogList from "@/components/BlogList";

interface BlogPost {
  _id: string;
  title: string;
  slug?: { current: string };
  excerpt?: string;
  image?: unknown;
  category?: string;
  publishedAt?: string;
}

interface BlogPreviewProps {
  posts?: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <div className="py-12 md:py-20 bg-[#08080C] w-full">
      <BlogList posts={posts} showLearnMore={true} />
    </div>
  );
}
