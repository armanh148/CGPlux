import { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { getBlogPosts, getBlogPage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog & Insights | CGplux Studios",
  description: "Explore our latest updates on tax-saving strategies, economic insights, 3D CGI workflows, and digital engineering trends.",
};

export default async function BlogPage() {
  const [posts, blogPage] = await Promise.all([
    getBlogPosts().catch(() => []),
    getBlogPage().catch(() => null),
  ]);

  return (
    <div className="pt-28 md:pt-36 pb-20 md:pb-32 bg-black relative min-h-screen">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <BlogList
          posts={posts}
          title={blogPage?.title}
          subtitle={blogPage?.subtitle}
          eyebrow={blogPage?.eyebrow}
          showViewAll={false}
        />
      </div>
    </div>
  );
}
