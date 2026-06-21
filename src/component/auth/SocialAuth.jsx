"use client";

import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export default function SocialAuth() {
  const handleGoogleLogin = async () => {
    try {
      /**
       * ==================================================
       * BETTER AUTH GOOGLE SIGN IN
       * ==================================================
       *
       * import { authClient } from "@/lib/auth-client";
       *
       * await authClient.signIn.social({
       *   provider: "google",
       *   callbackURL: "/",
       * });
       *
       */

      console.log("Google Login Clicked");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-5">
      {/* Divider */}
      <div className="relative flex items-center">
        <div className="flex-1 border-t border-default-200"></div>

        <span className="px-4 text-xs font-medium text-default-500 uppercase tracking-wider">
          Continue with
        </span>

        <div className="flex-1 border-t border-default-200"></div>
      </div>

      {/* Google Button */}
      <motion.div whileTap={{ scale: 0.98 }}>
        <Button
          fullWidth
      
          size="lg"
          onPress={handleGoogleLogin}
          startContent={<FcGoogle size={24} />}
          className="
            h-14
            border-default-200
            hover:bg-default-50
            text-default-700
            font-medium
            rounded-xl
          "
        >
          Continue with Google
        </Button>
      </motion.div>

      {/* Terms */}
      <p className="text-center text-xs text-default-500 leading-relaxed">
        By continuing, you agree to our{" "}
        <span className="font-medium cursor-pointer hover:underline">
          Terms of Service
        </span>{" "}
        and{" "}
        <span className="font-medium cursor-pointer hover:underline">
          Privacy Policy
        </span>
      </p>
    </div>
  );
}