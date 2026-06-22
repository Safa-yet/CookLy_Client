"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiLock, FiArrowLeft, FiHome } from "react-icons/fi";

export default function UnauthorizedPage() {
  return (
    <section className="min-h-screen bg-[#F4F6F8] flex items-center justify-center px-5 overflow-hidden relative py-12">
      {/* Background Shapes */}

      <div className="absolute top-0 right-0 w-[500px] h-[200px] bg-[#00B96D]/10 rounded-full blur-3xl" />

      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-3xl" />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] shadow-2xl p-8 md:p-14 text-center">
          {/* Lock Icon */}

          <motion.div
            initial={{
              scale: 0,
              rotate: -180,
            }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 150,
            }}
            className="mx-auto w-28 h-28 rounded-full bg-[#DFF8EC] flex items-center justify-center"
          >
            <FiLock className="text-[#00B96D] text-6xl" />
          </motion.div>

          {/* 403 */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            className="text-7xl md:text-8xl font-extrabold text-[#091E21] mt-8"
          >
            403
          </motion.h1>

          {/* Title */}

          <motion.h2
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.5,
            }}
            className="text-3xl md:text-4xl font-bold text-[#091E21] mt-4"
          >
            Access Denied
          </motion.h2>

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.7,
            }}
            className="text-gray-500 text-lg mt-5 max-w-xl mx-auto leading-relaxed"
          >
            Sorry, you do not have permission to access this page.
            This area may be restricted based on your account role
            or subscription plan.
          </motion.p>

          {/* Actions */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.9,
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#00B96D] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              <FiHome />
              Back To Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              <FiArrowLeft />
              Go Back
            </button>
          </motion.div>

          {/* Bottom Note */}

          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-400">
              If you believe this is a mistake, please contact support
              or upgrade your account plan.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}