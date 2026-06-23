import { ServerFetch } from "../Shared/Server";

export const getPlanById = (planId)=>{
    return ServerFetch(`/api/plans?plan_id=${planId}`);
}