"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SuccessContent({ customerEmail }) {
  const router = useRouter();

  const [showMessage, setShowMessage] = useState(true);

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F4F6F8] overflow-hidden flex items-center justify-center px-5">
      {/* Confetti */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={500}
      />

      {/* Success Popup */}
      {/* {showMessage && (
        // <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-5">
        //   <motion.div
        //     initial={{
        //       opacity: 0,
        //       scale: 0.8,
        //       y: 30,
        //     }}
        //     animate={{
        //       opacity: 1,
        //       scale: 1,
        //       y: 0,
        //     }}
        //     transition={{
        //       duration: 0.4,
        //     }}
        //     className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
        //   >
        //     <div className="w-20 h-20 mx-auto rounded-full bg-[#DFF8EC] flex items-center justify-center">
        //       <FiCheckCircle className="text-[#00B96D] text-5xl" />
        //     </div>

        //     <h2 className="text-3xl font-bold text-[#091E21] mt-5">
        //       Payment Successful 🎉
        //     </h2>

        //     <p className="text-gray-500 mt-3">
        //       Congratulations! Your subscription has been activated
        //       successfully.
        //     </p>

        //     <button
        //       onClick={() => router.push("/dashborad")}
        //       className="mt-6 w-full bg-[#00B96D] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
        //     >
        //       OK
        //     </button>
        //   </motion.div>
        // </div>
      )} */}

      {/* Background Decorations */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-[#00B96D]/10 rounded-full blur-3xl" />

      <div className="absolute bottom-20 right-20 w-52 h-52 bg-purple-300/20 rounded-full blur-3xl" />

      <div className="absolute top-1/2 left-0 w-24 h-24 bg-[#00B96D]/20 rounded-full blur-2xl" />

      {/* Main Card */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
          y: 50,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white p-4 md:p-7 text-center">
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
              delay: 0.3,
              type: "spring",
              stiffness: 150,
            }}
            className="flex justify-center"
          >
            <div className="w-28 h-28 rounded-full bg-[#DFF8EC] flex items-center justify-center">
              <FiCheckCircle className="text-[#00B96D] text-6xl" />
            </div>
          </motion.div>

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
              delay: 0.5,
            }}
            className="text-3xl font-bold text-[#091E21] mt-8"
          >
            Congratulations 🎉
          </motion.h1>

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
            className="text-gray-500 mt-5 text-lg"
          >
            Your payment has been completed successfully.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.9,
            }}
            className="mt-8 bg-[#F4F6F8] rounded-2xl p-5"
          >
            <p className="text-gray-600">
              Confirmation email sent to
            </p>

            <h3 className="text-[#091E21] font-bold text-xl mt-2">
              {customerEmail}
            </h3>
          </motion.div>

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
              delay: 1.1,
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <Link
              href="/dashboard/user"
              className="bg-[#00B96D] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              Go To Dashboard
            </Link>

            <Link
              href="/recipes"
              className="border border-gray-200 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Browse Recipes
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}