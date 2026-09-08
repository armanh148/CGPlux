import { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { getBlogPosts, getBlogPage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog & Insights | CGplux Studios",
  description: "Explore our latest updates on design thinking, digital innovation, 3D CGI workflows, and technical insights.",
};

export default async function BlogPage() {
  const [posts, blogPage] = await Promise.all([
    getBlogPosts().catch(() => []),
    getBlogPage().catch(() => null),
  ]);

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32 bg-[#08080C] relative min-h-screen w-full">
      <BlogList
        posts={posts}
        title={blogPage?.title}
        subtitle={blogPage?.subtitle}
        showLearnMore={false}
        showAll={true}
      />
    </div>
  );
}
