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
    <div className="py-20 md:py-32 bg-black">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <BlogList posts={posts} showViewAll={true} />
      </div>
    </div>
  );
}
