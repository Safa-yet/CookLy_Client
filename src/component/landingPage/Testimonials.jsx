'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  { id: 1, name: 'Sophia Martinez', location: 'Los Angeles, CA', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150', text: 'The food is absolutely amazing! Every bite is full of flavor and freshness. Highly recommended!', rating: 5 },
  { id: 2, name: 'James Anderson', location: 'New York, NY', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150', text: 'Great variety, excellent service, and super fast delivery. Cookly is my go-to for every meal.', rating: 5 },
  { id: 3, name: 'Olivia Bennett', location: 'Chicago, IL', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150', text: 'Fresh ingredients, perfect portions, and beautifully packed. I love their attention to detail!', rating: 5 }
];

export default function Testimonials() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <section className="w-full px-6 py-16 bg-brand-cream dark:bg-zinc-950 text-brand-cream-foreground transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-8 relative">
          <span className="text-xs uppercase tracking-widest text-brand-text-light dark:text-zinc-500 font-semibold font-sans">
            What Our Customers Say
          </span>
          <div className="flex justify-between items-end mt-2">
            <h2 className="text-4xl font-serif font-bold text-brand-cream-foreground">
              Loved By Thousands
            </h2>
            <Button 
              variant="light" 
              endContent={<FiArrowRight />}
              className="text-brand-cream-foreground hover:opacity-80 font-sans font-medium text-sm hidden md:flex items-center gap-1"
            >
              View All Reviews
            </Button>
          </div>

          {/* Navigation Arrows from image_2912b6_2.jpg */}
          <div className="absolute right-0 -top-4 hidden lg:flex items-center gap-2">
            <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-brand-cream-foreground hover:bg-brand-bg-green dark:hover:bg-zinc-900 transition-all">
              <FiChevronLeft size={18} />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-brand-cream-foreground hover:bg-brand-bg-green dark:hover:bg-zinc-900 transition-all">
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Testimonials Grid with Stagger Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {testimonials.map((item) => (
            <motion.div 
              key={item.id} 
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-brand-white dark:bg-zinc-900 p-8 rounded-[32px] border border-brand-bg-green/30 dark:border-zinc-800/80 shadow-xl dark:shadow-black/30 flex flex-col justify-between transition-colors duration-300"
            >
              <div>
                <FaQuoteLeft className="text-3xl mb-4 text-brand-lime opacity-20 dark:opacity-40" />
                <p className="text-brand-white-foreground dark:text-zinc-400 text-base leading-relaxed font-sans mb-6">
                  {item.text}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800/60">
                <div className="flex items-center gap-3">
                  {/* Next.js Image Optimization */}
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border border-gray-200 dark:border-zinc-700">
                    <Image 
                      src={item.avatar} 
                      alt={item.name} 
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-brand-cream-foreground font-sans font-bold text-sm">
                      {item.name}
                    </h4>
                    <p className="text-brand-text-light dark:text-zinc-500 font-sans text-xs">
                      {item.location}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5 text-brand-yellow">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} size={14} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}