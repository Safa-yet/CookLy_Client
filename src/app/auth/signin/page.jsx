"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, toast } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import SocialAuth from "@/component/auth/SocialAuth";

// Social login component (Google/Github etc.)
// import SocialAuth from "@/Components/Common Sec/SocialAuth";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  // ---------------- STATE ----------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleVisibility = () => setIsVisible(!isVisible);

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SIGN IN HANDLER ----------------
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      /**
       * =========================================================
       * 🔥 BETTER-AUTH CONNECTION POINT (YOU WILL CONNECT LATER)
       * =========================================================
       *
       * এখানে তুমি better-auth connect করবে
       * example:
       *
       * const res = await authClient.signIn.email({
       *    email,
       *    password,
       * });
       *
       * if (res.error) throw new Error(res.error.message);
       *
       * const user = res.data.user;
       */

      // 🔴 MOCK SUCCESS (REMOVE LATER WHEN CONNECT AUTH)
      const mockUser = {
        email,
        role: "user", // admin | chef | user (future use)
      };

      // ---------------- SUCCESS TOAST ----------------
      toast.success({
        title: "Welcome to CookLy 🍳",
        description: "Login successful",
        icon: <FiCheckCircle />,
      });

      /**
       * =========================================================
       * 🔥 ROLE BASED REDIRECT (KEEP READY FOR FUTURE)
       * =========================================================
       */

      if (mockUser.role === "admin") {
        router.push("/admin");
      } else if (mockUser.role === "chef") {
        router.push("/chef");
      } else {
        router.push(redirectTo);
      }

      router.refresh();
    } catch (error) {
      toast.error({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        icon: <FiAlertCircle />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7ed] via-[#f0fdf4] to-[#ecfeff] px-4">

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-8"
      >

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back to CookLy 🍽️
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to explore recipes & manage your account
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignIn} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition
              ${errors.email ? "border-red-400" : "border-gray-200 focus-within:border-green-500"}`}>

              <FiMail className="text-gray-400" />

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full outline-none bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <a
                href="/auth/forgot-password"
                className="text-xs text-green-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition
              ${errors.password ? "border-red-400" : "border-gray-200 focus-within:border-green-500"}`}>

              <FiLock className="text-gray-400" />

              <input
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                className="w-full outline-none bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="button" onClick={toggleVisibility}>
                {isVisible ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
            endContent={!isLoading && <FiArrowRight />}
          >
            Sign In
          </Button>
        </form>

        {/* SOCIAL LOGIN */}
        <div className="mt-6">
    <SocialAuth></SocialAuth>
        </div>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a
            href={`/auth/signup?redirect=${redirectTo}`}
            className="text-green-600 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </motion.div>
    </section>
  );
}