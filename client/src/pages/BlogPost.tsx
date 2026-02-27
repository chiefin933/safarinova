// SafariNova Travels — Blog Post Detail Page
// Design: Horizon Ivory — editorial article layout with sidebar

import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Tag, Share2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/data";
import { toast } from "sonner";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h2 className="font-display text-3xl text-[#1A1A1A]/40 mb-4">Article not found</h2>
          <Link href="/blog">
            <Button className="bg-[#1C4A2A] text-white">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        <div className="absolute top-24 left-0 right-0">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-2 font-ui text-xs text-white/70">
              <Link href="/"><span className="hover:text-white transition-colors">Home</span></Link>
              <ChevronRight size={12} />
              <Link href="/blog"><span className="hover:text-white transition-colors">Blog</span></Link>
              <ChevronRight size={12} />
              <span className="text-white line-clamp-1">{post.title}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="container mx-auto px-6 max-w-4xl">
            <span className="font-ui text-xs uppercase tracking-wider bg-[#B5622A] text-white px-3 py-1.5 rounded-full mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="font-display text-3xl lg:text-5xl font-semibold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 mb-10 pb-8 border-b border-[#E8DFD0]">
          <div className="flex items-center gap-3">
            <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-ui text-sm font-semibold text-[#1A1A1A]">{post.author}</div>
              <div className="font-ui text-xs text-[#1A1A1A]/50">{post.authorRole}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#1A1A1A]/50">
            <span className="font-ui text-xs">{post.date}</span>
            <span className="font-ui text-xs flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
          </div>
          <button
            onClick={() => toast.success("Article link copied!")}
            className="ml-auto flex items-center gap-2 font-ui text-xs text-[#1A1A1A]/50 hover:text-[#1C4A2A] transition-colors"
          >
            <Share2 size={14} /> Share
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="font-body text-lg text-[#1A1A1A]/80 leading-relaxed mb-6">{post.excerpt}</p>
          {post.content.map((section, i) => {
            if (section.type === "heading") return <h2 key={i} className="font-display text-3xl font-semibold text-[#1A1A1A] mb-4 mt-8">{section.text}</h2>;
            if (section.type === "paragraph") return <p key={i} className="font-body text-[#1A1A1A]/70 leading-relaxed mb-4">{section.text}</p>;
            if (section.type === "image") return (
              <div key={i} className="my-8 rounded-2xl overflow-hidden">
                <img src={section.src} alt={section.caption || ""} className="w-full h-72 object-cover" />
                {section.caption && <p className="font-ui text-xs text-[#1A1A1A]/40 text-center mt-2">{section.caption}</p>}
              </div>
            );
            if (section.type === "quote") return (
              <blockquote key={i} className="border-l-4 border-[#B5622A] pl-6 py-2 my-6">
                <p className="font-display text-xl italic text-[#1A1A1A]/70">{section.text}</p>
              </blockquote>
            );
            if (section.type === "list") return (
              <ul key={i} className="space-y-2 my-4">
                {section.items.map((item: string, j: number) => (
                  <li key={j} className="flex items-start gap-3 font-body text-[#1A1A1A]/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B5622A] mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            );
            return null;
          })}
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-[#E8DFD0]">
            <Tag size={14} className="text-[#1A1A1A]/40 mt-0.5" />
            {post.tags.map((tag) => (
              <span key={tag} className="font-ui text-xs bg-[#E8DFD0] text-[#1A1A1A]/60 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <div>
            <h3 className="font-display text-2xl font-semibold text-[#1A1A1A] mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`}>
                  <div className="group cursor-pointer bg-white rounded-xl border border-[#E8DFD0] overflow-hidden card-lift">
                    <div className="h-36 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <span className="font-ui text-[10px] uppercase tracking-wider text-[#B5622A]">{p.category}</span>
                      <h4 className="font-display text-base font-semibold text-[#1A1A1A] mt-1 line-clamp-2 group-hover:text-[#1C4A2A] transition-colors">
                        {p.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link href="/blog">
            <button className="flex items-center gap-2 font-ui text-sm text-[#1A1A1A]/50 hover:text-[#1C4A2A] transition-colors">
              <ArrowLeft size={14} /> Back to Blog
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
