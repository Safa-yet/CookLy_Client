"use server"

// import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const ServerFetch = async (path)=>{
    const res =await fetch(`${baseUrl}${path}`)
    const data = await res.json();
    return data
}


export const ServerPost =async (formData,path,method ="POST")=>{
    const res= await fetch(`${baseUrl}${path}`,{
        method: method,
         headers : {
        "Content-Type": "application/json",
        },
         body: JSON.stringify(formData),
    })
    return res.json();
}


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