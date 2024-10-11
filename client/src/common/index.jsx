const backendDomin = "http://localhost:3000";

export const SummaryApi = {
  signUp: { url: `${backendDomin}/api/auth/signup`, method: "POST" },
  signIn: { url: `${backendDomin}/api/auth/signin`, method: "POST" },
  signOut: { url: `${backendDomin}/api/auth/signout`, method: "GET" },
  all_users: { url: `${backendDomin}/api/user/all-users`, method: "GET" },
  current_user: { url: `${backendDomin}/api/user/user-details`, method: "GET" },
};
