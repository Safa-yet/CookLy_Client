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
            plan: "free",
          },
        },
      });
    };

    return (
         <div className="w-full space-y-2.5">
            <Button onClick={signIn} className="flex hover:text-white text-black items-center justify-center gap-3 w-full rounded-full border-2 border-outline-variant/30 hover:bg-sec  bg-transparent transition-all duration-300 active:scale-95">
              <FcGoogle />
              <span className="font-semibold ">Google</span>
            </Button>
            
            <Button className="flex hover:text-white text-black items-center justify-center gap-3 w-full rounded-full border-2 border-outline-variant/30 hover:bg-sec  bg-transparent transition-all duration-300 active:scale-95">
              <FaFacebookF />
              <span className="font-semibold ">Facebook</span>
            </Button>
          </div>
    );
};

export default SocialAuth;