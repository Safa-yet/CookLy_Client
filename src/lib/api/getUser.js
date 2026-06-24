import { ServerFetch } from "../Shared/Server";

export const getAllUsers = () => {
  return ServerFetch("/api/manage_users");
};

export const getUserByEmail = async (email) => {
  return ServerFetch(`/auth/users?email=${email}`);
};
