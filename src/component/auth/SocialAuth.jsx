'use client'
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SocialAuth = () => {
     const signIn = async () => {
      const data = await authClient.signIn.social({
        provider: "google",
        newUserOptions: {
          additionalFields: {
            role: "user",
            plan: "user_free",
          },
        },
      });
    };

    return (
         <div className="w-full grid grid-cols-2 gap-4 mt-2">
            {/* Google Button */}
            <Button 
              onClick={signIn} 
              className="
                flex items-center justify-center gap-3 w-full h-12 
                rounded-2xl border-2 border-zinc-100 dark:border-zinc-800/80 
                bg-zinc-50/50 dark:bg-zinc-950/40 
                text-zinc-800 dark:text-zinc-200 
                font-bold text-sm 
                transition-all duration-300 
                hover:bg-white dark:hover:bg-zinc-900 
                hover:border-zinc-200 dark:hover:border-zinc-700
                hover:shadow-sm active:scale-[0.98]
              "
            >
              <FcGoogle className="text-xl shrink-0" />
              <span>Google</span>
            </Button>
            
            {/* Facebook Button */}
            <Button 
              className="
                flex items-center justify-center gap-3 w-full h-12 
                rounded-2xl border-2 border-zinc-100 dark:border-zinc-800/80 
                bg-zinc-50/50 dark:bg-zinc-950/40 
                text-zinc-800 dark:text-zinc-200 
                font-bold text-sm 
                transition-all duration-300 
                hover:bg-white dark:hover:bg-zinc-900 
                hover:border-zinc-200 dark:hover:border-zinc-700
                hover:shadow-sm active:scale-[0.98]
              "
            >
              <FaFacebookF className="text-xl text-[#1877F2] shrink-0" />
              <span>Facebook</span>
            </Button>
          </div>
    );
};

export default SocialAuth;