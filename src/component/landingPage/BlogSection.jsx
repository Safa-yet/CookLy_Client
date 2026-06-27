"use client";

import React from "react";
import Image from "next/image";
import { Button, Card } from "@heroui/react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "10 Healthy Lunch Ideas You'll Love",
    date: "June 10, 2024",
    category: "Healthy Eating",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400",
  },
  {
    id: 2,
    title: "5 Cooking Tips From Our Chefs",
    date: "June 5, 2024",
    category: "Cooking Tips",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400",
  },
  {
    id: 3,
    title: "Delicious Desserts You Can Make At Home",
    date: "June 1, 2024",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=400",
  },
];

export default function BlogSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="w-full px-6 py-16 bg-brand-cream dark:bg-zinc-950 text-brand-cream-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-8">
          <span className="text-xs uppercase tracking-widest text-brand-text-light dark:text-zinc-500 font-semibold font-sans">
            From Our Blog
          </span>
          <div className="flex justify-between items-end mt-2">
            <h2 className="text-4xl font-serif font-bold text-brand-cream-foreground">
              Latest Recipes & Tips
            </h2>
            <Button
              variant="light"
              endContent={<FiArrowRight />}
              className="text-brand-cream-foreground hover:opacity-80 font-sans font-medium text-sm hidden md:flex items-center gap-1"
            >
              View All Articles
            </Button>
          </div>
        </div>

        {/* Blog Posts Grid with Stagger Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
        >
          {blogPosts.map((post) => (
            <motion.div 
              key={post.id} 
              variants={cardVariants}
              className="w-full"
            >
              <Card className="bg-transparent shadow-none border-none rounded-none overflow-visible w-full flex flex-row items-center gap-5">
                
                {/* Left Side: Next.js Optimized Image with Framer Motion Layout */}
                <div className="w-32 h-24 md:w-40 md:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-md relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-w-768px) 128px, 160px"
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                {/* Right Side: Structured Card Architecture */}
                <div className="flex-1 flex flex-col justify-center text-left">
                  <Card.Header className="p-0 bg-transparent flex flex-col items-start gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-brand-text-light dark:text-zinc-500 font-sans">
                      <Card.Description as="span">{post.date}</Card.Description>
                      <span>•</span>
                      <span className="font-medium text-brand-lime dark:text-brand-light">
                        {post.category}
                      </span>
                    </div>
                    <Card.Title className="text-base md:text-lg font-serif font-bold text-brand-cream-foreground line-clamp-2 leading-snug mt-1 transition-colors duration-300">
                      {post.title}
                    </Card.Title>
                  </Card.Header>

                  <Card.Content className="p-0 bg-transparent mt-2">
                    <button className="flex items-center gap-1 text-xs font-sans font-bold text-brand-cream-foreground dark:text-zinc-300 group">
                      Read More
                      <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </Card.Content>
                </div>

              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}