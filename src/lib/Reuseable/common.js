import { redirect } from "next/navigation";


export const redirectToLogin = (recipe) => {
  redirect(
    `/auth/signin?redirect=/recipes/${recipe._id}`
  );

  toast.error(
    "Please login first"
  );

  return true;
};