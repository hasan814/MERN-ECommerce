const backendDomin = "http://localhost:3000";

export const SummaryApi = {
  signUp: { url: `${backendDomin}/api/auth/signup`, method: "POST" },
  signIn: { url: `${backendDomin}/api/auth/signin`, method: "POST" },
  current_user: { url: `${backendDomin}/api/user/user-details`, method: "GET" },
};
