import { ProtectServerFetch, ServerFetch } from "../Shared/Server";

export const getAllUsers = () => {
  return ServerFetch("/api/manage_users");
};

export const getUserByEmail = async (email) => {
  return ProtectServerFetch(`/auth/users?email=${email}`);
};
