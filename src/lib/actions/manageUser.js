import { ServerPost } from "../Shared/Server";

export const userBlock = async (id) => {
  return await ServerPost({}, `/api/manage_users/block/${id}`, "PATCH");
};

export const userUnblock = async (id) => {
  return await ServerPost({}, `/api/manage_users/unblock/${id}`, "PATCH");
};
