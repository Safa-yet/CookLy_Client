import { data } from "framer-motion/client"
import { auth } from "../auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getUserSession = async()=>{
    const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
    const data = session?.user;
    return  data
}

// export const getUserToken =async()=>{
//       const session = await auth.api.getSession({
//     headers: await headers() // you need to pass the headers object.
// })
//     const data = session?.session?.token;
//     return  data
// }

export const requirRole = async(role)=>{
    const user = await getUserSession();
    if(!user){
        redirect('/auth/signin')
    }
    if(user?.role !== role){
     return   redirect("/unauthorized")
    }
    return true


}