"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";

import { Button, Card } from "@heroui/react";

import { BiHomeAlt } from "react-icons/bi";

import { FiRefreshCw } from "react-icons/fi";

import { MdOutlineErrorOutline } from "react-icons/md";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      className="
      relative
      flex
      min-h-screen
      items-center
      justify-center
      overflow-hidden
      bg-background
      px-5
    "
    >
      {/* Background Blur */}

      <div
        className="
        absolute
        -left-32
        top-0
        h-80
        w-80
        rounded-full
        bg-success/20
        blur-[120px]
      "
      />

      <div
        className="
        absolute
        -right-32
        bottom-0
        h-80
        w-80
        rounded-full
        bg-warning/20
        blur-[120px]
      "
      />

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
          ease: "easeOut",
        }}
        className="w-full max-w-2xl"
      >
        <Card
          className="
          border
          border-divider
          bg-content1/90
          backdrop-blur-xl
          shadow-2xl
          rounded-[32px]
        "
        >
          <Card.Header className="flex flex-col items-center pt-10">
            <motion.div
              animate={{
                rotate: [0, -6, 6, -6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-danger/10
              text-danger
            "
            >
              <MdOutlineErrorOutline size={55} />
            </motion.div>

            <h1
              className="
              mt-8
              text-center
              text-4xl
              font-black
              text-foreground
            "
            >
              Oops! Something went wrong
            </h1>

            <p
              className="
              mt-4
              max-w-lg
              text-center
              text-default-500
              leading-7
            "
            >
              An unexpected error occurred while loading this page. Please try
              again or return to the homepage.
            </p>
          </Card.Header>

          <Card.Content className="px-8">
            {process.env.NODE_ENV === "development" && (
              <div
                className="
                mt-6
                rounded-2xl
                border
                border-danger/20
                bg-danger/5
                p-5
              "
              >
                <p className="mb-2 font-semibold text-danger">
                  Development Error
                </p>

                <pre
                  className="
                  whitespace-pre-wrap
                  break-all
                  text-sm
                  text-default-600
                "
                >
                  {error?.message}
                </pre>
              </div>
            )}
          </Card.Content>

          <Card.Footer
            className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:justify-center
            pb-10
            pt-8
          "
          >
            <Button
              color="success"
              size="lg"
              radius="full"
              startContent={<FiRefreshCw />}
              onPress={reset}
            >
              Try Again
            </Button>

            <Button
              as={Link}
              href="/"
              variant="bordered"
              size="lg"
              radius="full"
              startContent={<BiHomeAlt />}
            >
              Back to Home
            </Button>
          </Card.Footer>
        </Card>
      </motion.div>
    </section>
  );
}
