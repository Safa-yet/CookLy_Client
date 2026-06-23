import { ServerPost } from "../Shared/Server";



export const createSubsction = async(subInfo)=>{
    return ServerPost(subInfo,'/api/subscriptions');
}