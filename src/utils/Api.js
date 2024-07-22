const backendDomin = "http://localhost:8080";

export const SummaryApi = {
  signUp: { url: `${backendDomin}/api/signup`, method: "post" },
  signIn: { url: `${backendDomin}/api/signin`, method: "post" },
};
