"use client";

import Lottie from "lottie-react";
import { motion } from "framer-motion";

import lottieImg from "../../public/Lonely 404.json";
import { BiHome } from "react-icons/bi";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFoundPage() {
  return (
    <div
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden

        bg-gradient-to-br
        from-[#f8fafc]
        via-white
        to-[#eefaf5]

        dark:from-[#09090b]
        dark:via-[#111827]
        dark:to-[#0b1b14]

        transition-colors
        duration-500
      "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -top-32
            -left-24
            h-80
            w-80
            rounded-full
            bg-green-400/20
            blur-3xl
            dark:bg-green-500/10
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            h-96
            w-96
            rounded-full
            bg-emerald-300/20
            blur-3xl
            dark:bg-emerald-500/10
          "
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          relative
          z-10
          w-full
          max-w-2xl
          mx-4
        "
      >
        <div
          className="
            rounded-[36px]
            border
            border-white/30
            dark:border-white/10

            bg-white/70
            dark:bg-zinc-900/70

            backdrop-blur-2xl

            shadow-[0_20px_80px_rgba(0,0,0,.08)]
            dark:shadow-[0_20px_80px_rgba(0,0,0,.45)]

            p-8
            md:p-12

            text-center
          "
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            className="mx-auto max-w-md"
          >
            <Lottie animationData={lottieImg} loop />
          </motion.div>

          <h1
            className="
              mt-2
              text-4xl
              md:text-5xl
              font-black

              bg-gradient-to-r
              from-green-600
              to-emerald-500

              bg-clip-text
              text-transparent
            "
          >
            404
          </h1>

          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
            Page Not Found
          </h2>

          <p className="mt-4 max-w-lg mx-auto text-default-500 leading-7">
            Sorry, the page you're looking for doesn't exist or may have been
            moved. Please check the URL and try again.
          </p>
          <Link href="/" className="mt-10">
              <Button
                size="lg"
                radius="full"
                color="success"
                startContent={<BiHome size={20} />}
                className="
                  px-8
                  font-semibold
                  shadow-lg
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >
                Back to Home
              </Button>
            </Link>
        </div>
      </motion.div>
    </div>
  );
}
