"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import LightLogo from "../../img/Logo_Black.png";

import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaPinterestP, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock 
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // সোশ্যাল মিডিয়া লিংক ডেটা
  const socialLinks = [
    { icon: <FaFacebookF size={16} />, href: "https://facebook.com" },
    { icon: <FaInstagram size={16} />, href: "https://instagram.com" },
    { icon: <FaTwitter size={16} />, href: "https://twitter.com" },
    { icon: <FaPinterestP size={16} />, href: "https://pinterest.com" },
  ];

  // ফুটার লিংক গ্রুপ ডেটা
  const linkGroups = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Menu", href: "/menu" },
        { name: "Catering", href: "/catering" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQ", href: "/faq" },
        { name: "Shipping & Delivery", href: "/shipping" },
        { name: "Returns", href: "/returns" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms & Conditions", href: "/terms" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "Our Story", href: "/story" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Press", href: "/press" },
        { name: "Franchise", href: "/franchise" },
      ],
    },
  ];

  // কন্টাক্ট ইনফো ডেটা
  const contactInfo = [
    { icon: <FaMapMarkerAlt className="mt-1 shrink-0" />, text: "123 Foodie Lane, Los Angeles, CA 90001" },
    { icon: <FaPhoneAlt className="shrink-0" />, text: "(213) 555-7890" },
    { icon: <FaEnvelope className="shrink-0" />, text: "hello@cookly.com" },
    { icon: <FaClock className="shrink-0" />, text: "Mon - Sun: 9:00 AM - 10:00 PM" },
  ];

  return (
    <footer className="bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] font-sans pt-16 pb-8 px-6 md:px-12 lg:px-24 border-t border-[var(--color-brand-light)]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6 mb-12">
        
        
        <div className="flex flex-col space-y-5 lg:col-span-1.5">
          <div className="flex items-center space-x-2">
            
            <Image 
              src={LightLogo}
              alt="Cookly Logo" 
              width={140} 
              height={45} 
              className="object-contain"
              priority
            />
          </div>
          <div className="text-[var(--color-brand-cream)]/80 text-sm leading-relaxed space-y-1">
            <p>Delicious food made with love.</p>
            <p>Fresh ingredients, exceptional taste.</p>
          </div>
          
          
          <div className="flex items-center space-x-3 pt-2">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-[var(--color-brand-cream)] border border-white/5 transition-colors duration-300"
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: "var(--color-brand-light)",
                  color: "#FFFFFF"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        
        {linkGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="flex flex-col space-y-4">
            <h3 className="text-white font-medium text-base tracking-wide uppercase text-xs opacity-90">
              {group.title}
            </h3>
            <ul className="flex flex-col space-y-2.5 text-sm text-[var(--color-brand-cream)]/75">
              {group.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link href={link.href} className="relative py-1 inline-block group overflow-hidden">
                    <span className="transition-colors duration-300 group-hover:text-white">
                      {link.name}
                    </span>
                    
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--color-brand-light)] transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        
        <div className="flex flex-col space-y-4">
          <h3 className="text-white font-medium text-base tracking-wide uppercase text-xs opacity-90">
            Contact Us
          </h3>
          <ul className="flex flex-col space-y-3.5 text-sm text-[var(--color-brand-cream)]/75">
            {contactInfo.map((info, idx) => (
              <li key={idx} className="flex items-start space-x-3 group transition-colors duration-300 hover:text-white">
                <span className="text-[var(--color-brand-light)] pt-0.5 group-hover:text-[var(--color-brand-yellow)] transition-colors duration-300">
                  {info.icon}
                </span>
                <span className="leading-tight">{info.text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      
      <div className="max-w-7xl mx-auto pt-8 mt-4 border-t border-white/10 text-center text-xs text-[var(--color-brand-cream)]/50 tracking-wide">
        <p>&copy; {currentYear} Cookly. All Rights Reserved.</p>
      </div>
    </footer>
  );
}