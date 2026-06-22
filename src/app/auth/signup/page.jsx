"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
Form,
Fieldset,
FieldGroup,
TextField,
Input,
Label,
FieldError,
Button,
} from "@heroui/react";

import {
FiUser,
FiMail,
FiLock,
FiEye,
FiEyeOff,
FiUpload,
FiArrowRight,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [imageFile, setImageFile] = useState(null);
const [preview, setPreview] = useState("");
const [loading, setLoading] = useState(false);

const router = useRouter();

const handleImageChange = (e) => {
const file = e.target.files?.[0];

if (!file) return;

setImageFile(file);

const previewUrl = URL.createObjectURL(file);

setPreview(previewUrl);
};

const uploadToImageBB = async (imageFile) => {
const formData = new FormData();

formData.append("image", imageFile);

const response = await fetch(
`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
{
method: "POST",
body: formData,
}
);

const result = await response.json();

return result?.data?.display_url || result?.data?.url || "";
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const getFormInfo = Object.fromEntries(
      formData.entries()
    );

    if (
      getFormInfo.password !==
      getFormInfo.confirmPassword
    ) {
      alert({
        title: "Password mismatch",
        description:
          "Password and confirm password must match",
        color: "danger",
      });

      return;
    }

    if (
      !/(?=.*[a-z])(?=.*[A-Z])/.test(
        getFormInfo.password
      )
    ) {
      alert({
        title: "Invalid password",
        description:
          "Password must contain one uppercase and one lowercase letter",
        color: "danger",
      });

      return;
    }

    let profileImage = "";

    // Upload Image To ImageBB
    if (imageFile) {
      profileImage =
        await uploadToImageBB(imageFile);
    }

    const userData = {
      name: getFormInfo.name,
      email: getFormInfo.email,
      password: getFormInfo.password,

      image: profileImage,

      role: "user",

      plan: "free",

      isBlocked: false,

      createdAt: new Date(),
    };

    console.log(
      "Signup Data =>",
      userData
    );

    // ==========================
    // Better Auth Signup
    // ==========================

 
    const { data, error } =
      await authClient.signUp.email({
        email: userData.email,
        password: userData.password,
        name: userData.name,

        image: userData.image,

        role: userData.role,
        plan: userData.plan,

        isBlocked:
          userData.isBlocked,

        createdAt:
          userData.createdAt,
      });

    if (error) {
      alert({
        title: "Signup Failed",
        description:
          error.message,
        color: "danger",
      });

      return;
    }

    router.push("/");

    alert({
      title: "Success",
      description:
        "Account Created Successfully",
      color: "success",
    });

  } catch (error) {
    console.error(error);

    alert({
      title: "Error",
      description:
        "Something went wrong",
      color: "danger",
    });
  } finally {
    setLoading(false);
  }
};

return (
<section
className="
min-h-screen


  bg-brand-cream
  dark:bg-zinc-950

  px-4
  py-16

  flex
  items-center
  justify-center
"
>
  <motion.div
    initial={{
      opacity: 0,
      y: 20,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    className="
      w-full
      max-w-2xl
    "
  >
    <Form
      onSubmit={handleSubmit}
      className="w-full"
    >
      <Fieldset
        className="
        rounded-[32px]

        bg-brand-white
        dark:bg-zinc-900

        border

        border-brand-bg-green
        dark:border-zinc-800

        p-8

        shadow-xl
      "
      >
        <div className="mb-8">
          <h1
            className="
            text-4xl
            font-bold

            text-brand-text-main
            dark:text-white
          "
          >
            Join CookLy
          </h1>

          <p
            className="
            mt-3

            text-brand-text-muted
            dark:text-zinc-400
          "
          >
            Create your account
            and start sharing
            recipes.
          </p>
        </div>

        <FieldGroup className="space-y-5">
          <div>
            <Label>
              Profile Photo
            </Label>

            <label
              className="
              mt-2

              h-56

              border-2
              border-dashed

              border-brand-bg-green
              dark:border-zinc-700

              rounded-3xl

              flex
              flex-col
              items-center
              justify-center

              overflow-hidden

              cursor-pointer

              transition

              hover:border-brand-lime
            "
            >
              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="hidden"
              />

              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  width={500}
                  height={700}
                  className="
                  w-full
                  h-full
                  object-cover
                "
                />
              ) : (
                <>
                  <FiUpload
                    className="
                    text-5xl

                    text-brand-lime
                  "
                  />

                  <p
                    className="
                    mt-4
                    font-medium

                    text-brand-text-main
                    dark:text-white
                  "
                  >
                    Upload Profile
                    Image
                  </p>

                  <span
                    className="
                    text-sm

                    text-brand-text-light
                    dark:text-zinc-500
                  "
                  >
                    PNG, JPG, WEBP
                  </span>
                </>
              )}
            </label>
          </div>

          <TextField
            isRequired
            name="name"
          >
            <Label>
              Full Name
            </Label>

            <Input
              placeholder="Safayet"
              startContent={
                <FiUser />
              }
            />

            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
          >
            <Label>
              Email Address
            </Label>

            <Input
              placeholder="you@example.com"
              startContent={
                <FiMail />
              }
            />

            <FieldError />
          </TextField>

      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }

          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <FieldError />
      </TextField>

          <TextField
            isRequired
            name="confirmPassword"
          >
            <Label>
              Confirm Password
            </Label>

            <Input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="********"
              startContent={
                <FiLock />
              }
              endContent={
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              }
            />

            <FieldError />
          </TextField>

          <Button
            type="submit"
            isLoading={loading}
            className="
            w-full
            h-12

            bg-brand-dark
            hover:bg-brand-lime

            text-white

            transition-all
            duration-300
          "
          >
            Create Account

            <FiArrowRight />
          </Button>
        </FieldGroup>

        <div
          className="
          mt-6
          text-center
        "
        >
          <p
            className="
            text-brand-text-muted
            dark:text-zinc-400
          "
          >
            Already have an
            account?

            <Link
              href="/auth/signin"
              className="
              ml-2

              font-semibold

              text-brand-lime
            "
            >
              Sign In
            </Link>
          </p>
        </div>
      </Fieldset>
    </Form>
  </motion.div>
</section>


);
}
