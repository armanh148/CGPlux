import { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { getBlogPosts, getBlogPage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog | CGplux Studios",
  description: "Insights, news, and tutorials from CGplux Studios.",
};

export default async function BlogPage() {
  const [posts, blogPage] = await Promise.all([
    getBlogPosts().catch(() => []),
    getBlogPage().catch(() => null),
  ]);

  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-32 bg-[#000000] overflow-hidden border-b border-white/[0.08]">
      <div className="absolute inset-0 redstone-grid-lines opacity-40 pointer-events-none" />
      <div className="w-full px-6 lg:px-12 relative">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
            <span className="w-6 h-[1.5px] bg-white" />
            {blogPage?.eyebrow || "Blog"}
          </div>
          <h1 className="m-0 font-heading font-black tracking-tight text-4xl sm:text-5xl md:text-7xl leading-[0.95] text-white uppercase">
            {blogPage?.title || "Latest Insights"}
          </h1>
          <p className="m-0 text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl leading-[1.7] font-light">
            {blogPage?.subtitle || "Thoughts on CGI, VFX, and the future of digital production."}
          </p>
        </div>
      </div>
      <div className="w-full px-6 lg:px-12 relative mt-20">
        <BlogList posts={posts} />
      </div>
    </section>
  );
}
