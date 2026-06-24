import { ServerFetch } from "../Shared/Server";


export const getAllUsers = ()=>{
    return ServerFetch('/api/manage_users');
}