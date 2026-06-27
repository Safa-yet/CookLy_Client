"use client";

import { motion } from "framer-motion";
import { AiFillCrown } from "react-icons/ai";
import { FiArrowRight, FiAward, FiBookOpen, FiCheck, FiUsers, FiZap } from "react-icons/fi";


const plans = [
  {
    name: "Free",
    id: "user_free",
    price: "$0",
    period: "",
    icon: <FiBookOpen className="text-zinc-400 text-2xl" />,
    description: "Perfect for beginners who want to start sharing recipes.",
    features: [
      "Publish up to 2 recipes",
      "Browse all recipes",
      "Like recipes",
      "Save favorite recipes",
      "Basic profile access",
    ],
    popular: false,
    btnBg: "bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200",
  },
  {
    name: "Pro",
    id: "user_pro",
    price: "$9.99",
    period: "/mo",
    icon: <FiZap className="text-emerald-600 dark:text-emerald-400 text-2xl" />,
    popular: true,
    description: "Best choice for active recipe creators.",
    features: [
      "Publish 10 recipes per month",
      "Browse all recipes",
      "Like & favorite recipes",
      "Purchase premium recipes",
      "Priority support",
      "Advanced creator tools",
    ],
    btnBg: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20",
  },
  {
    name: "Premium",
    id: "user_premium",
    price: "$19.99",
    period: "/mo",
    icon: <AiFillCrown className="text-amber-500 text-2xl" />,
    description: "Unlimited publishing with exclusive premium benefits.",
    features: [
      "Unlimited recipe publishing",
      "Premium profile badge",
      "Browse all recipes",
      "Like & favorite recipes",
      "Purchase premium recipes",
      "Priority support",
      "Early access to new features",
    ],
    popular: false,
    btnBg: "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 shadow-md",
  },
];

const benefits = [
  {
    icon: <FiBookOpen size={28} className="text-emerald-600 dark:text-emerald-400" />,
    title: "Share Recipes",
    desc: "Publish your favorite dishes and inspire food lovers worldwide seamlessly.",
  },
  {
    icon: <FiUsers size={28} className="text-emerald-600 dark:text-emerald-400" />,
    title: "Build Community",
    desc: "Connect with passionate cooks, receive feedback, and grow your audience.",
  },
  {
    icon: <FiAward size={28} className="text-emerald-600 dark:text-emerald-400" />,
    title: "Premium Benefits",
    desc: "Unlock ultimate unlimited publishing slots and exclusive verified profile perks.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

function PlanCard({ name, id, price, period, description, features, popular, icon, btnBg }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`relative font-sans group flex flex-col h-full rounded-[36px] p-8 transition-all duration-300 ${
        popular
          ? "bg-white dark:bg-zinc-900 border-2 border-emerald-500 shadow-[0_30px_60px_rgba(4,47,30,0.08)] scale-105 z-10"
          : "bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800/80 shadow-[0_20px_40px_rgba(0,0,0,0.02)] hover:border-zinc-300 dark:hover:border-zinc-700"
      }`}
    >
      {popular && (
        <span className="absolute top-5 right-5 bg-emerald-500 text-white px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase">
          Most Popular
        </span>
      )}

      {/* Card Header */}
      <div className="mb-6">
        <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 mb-4 shadow-sm">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {name}
        </h3>
        <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-2 font-medium min-h-[40px]">
          {description}
        </p>
      </div>

      {/* Pricing Pricing Section */}
      <div className="mb-6 flex items-baseline">
        <span className="text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
          {price}
        </span>
        <span className="text-zinc-400 dark:text-zinc-500 font-semibold text-sm ml-1">
          {period}
        </span>
      </div>

      {/* Features List */}
      <div className="space-y-3.5 flex-grow mb-8 border-t border-dashed border-zinc-200/80 dark:border-zinc-800/80 pt-6">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-3 text-sm">
            <div className="mt-0.5 rounded-full p-0.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shrink-0">
              <FiCheck size={14} className="stroke-[3]" />
            </div>
            <span className="text-zinc-600 dark:text-zinc-300 font-medium">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Checkout Form & Button */}
      <form action="/api/checkout_sessions" method="POST" className="w-full mt-auto">
        <input type="hidden" name="plan_id" value={id} />
        <button
          type="submit"
          className={`w-full h-12 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 active:scale-[0.98] ${btnBg}`}
        >
          {id === "user_free" ? "Current Plan" : "Upgrade Now"}
        </button>
      </form>
    </motion.div>
  );
}

export default function PlansPage() {
  return (
    <section className="font-sans min-h-screen bg-[#FBFBFA] dark:bg-zinc-950 py-20 px-6 relative overflow-hidden transition-colors duration-300 select-none">
      
      {/* Decorative Brand Light Glow Glares */}
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/5 dark:bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Hero Headers */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-24 flex flex-col items-center"
        >
          <motion.span 
            variants={fadeInUp}
            className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100/60 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase font-sans shadow-sm"
          >
            Membership Plans
          </motion.span>

          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-zinc-900 dark:text-zinc-50 mt-6 max-w-3xl leading-tight tracking-tight"
          >
            Unlock Your Culinary <br className="hidden sm:inline" />
            <span className="text-emerald-600 dark:text-emerald-400">Publishing Power</span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-zinc-400 dark:text-zinc-400 max-w-2xl mx-auto mt-4 text-base sm:text-lg font-medium"
          >
            Share signature recipes, inspire an active community of food lovers, and elevate your dashboard tracking systems.
          </motion.p>
        </motion.div>

        {/* Pricing Cards Layout Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center lg:px-4"
        >
          {plans.map((plan) => (
            <PlanCard key={plan.id} {...plan} />
          ))}
        </motion.div>

        {/* Brand Benefits Features Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-36 border-t border-zinc-200/60 dark:border-zinc-800/80 pt-16"
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-white/40 dark:bg-zinc-900/20 backdrop-blur-sm border border-zinc-100 dark:border-zinc-900 rounded-[28px] p-6 shadow-sm flex gap-4 items-start"
            >
              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  {benefit.title}
                </h3>
                <p className="text-zinc-400 dark:text-zinc-500 text-xs md:text-sm font-medium mt-1.5 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Luxury CTA Canvas Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-32 relative overflow-hidden bg-[#042F1E] dark:bg-zinc-900 rounded-[40px] p-10 md:p-14 text-center shadow-[0_30px_60px_rgba(4,47,30,0.15)] border border-emerald-950/20"
        >
          {/* Subtle Graphic Glow Circle inside CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Ready to Become a Top <br className="hidden sm:inline" /> Cookly Creator?
          </h2>

          <p className="text-emerald-200/70 dark:text-zinc-400 mt-4 max-w-xl mx-auto text-sm sm:text-base font-medium">
            Join thousands of food lovers already sharing and monetizing premium custom food recipes today.
          </p>

          <button className="group mt-8 inline-flex items-center gap-2.5 bg-emerald-500 text-white hover:bg-emerald-400 px-8 h-14 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 active:scale-[0.98] shadow-lg shadow-emerald-950/30">
            <span>Start Sharing Today</span>
            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}