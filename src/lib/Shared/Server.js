"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

// import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const ServerFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {});
  const data = await res.json();
  return data;
};
export const ProtectServerFetch = async (path) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
// Project surver
export const ServerPost = async (formData, path, method = "POST") => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  console.log(token, "Apiii Token");
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return res.json();
};

// AuthHeader for Token
// export const authHeader = async()=>{
//     const token = await getUserToken();
//     const header = {
//         authorization: `Bearer ${token}`

//     }
//     return token? header : {}

// }

// For some Protected data
// export const  protectedFetch =async (path)=>{
//     const res =await fetch(`${baseUrl}${path}`,{
//     headers: await authHeader()
//     })
//     const data = await res.json();
//     return data
// }
