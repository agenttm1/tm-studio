"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { posts, type Post } from "@/components/demo/akademija/lib/content";
import { site } from "@/components/demo/akademija/lib/site";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("hr-HR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogSection() {
  const [activePost, setActivePost] = useState<Post | null>(null);

  return (
    <section id="novosti" className="bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-white md:text-5xl">
            Novosti
          </h2>
          <p className="mt-3 max-w-md text-white/60">
            Najnovije objave iz akademije {site.name}.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.button
              key={post.id}
              onClick={() => setActivePost(post)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-lg border border-white/10 bg-white/3 text-left"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-[#3ECF4A]">
                  {formatDate(post.date)}
                </p>
                <h3 className="mt-2 text-lg font-bold text-white">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {post.excerpt}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8"
            onClick={() => setActivePost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-y-auto rounded-lg border border-white/10 bg-black md:flex-row"
            >
              <button
                onClick={() => setActivePost(null)}
                className="absolute right-4 top-4 z-10 text-white/70 transition-colors hover:text-white"
                aria-label="Zatvori"
              >
                <X size={28} />
              </button>

              <div className="aspect-video w-full shrink-0 overflow-hidden md:aspect-auto md:w-1/2">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center p-8 md:w-1/2">
                <p className="text-sm text-[#3ECF4A]">
                  {formatDate(activePost.date)}
                </p>
                <h3 className="mt-3 text-2xl font-extrabold text-white md:text-3xl">
                  {activePost.title}
                </h3>
                <p className="mt-4 leading-relaxed text-white/70">
                  {activePost.excerpt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
