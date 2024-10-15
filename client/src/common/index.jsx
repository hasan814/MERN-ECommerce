const backendDomin = "http://localhost:3000";

export const SummaryApi = {
  signUp: { url: `${backendDomin}/api/auth/signup`, method: "POST" },
  signIn: { url: `${backendDomin}/api/auth/signin`, method: "POST" },
  signOut: { url: `${backendDomin}/api/auth/signout`, method: "GET" },
  all_users: { url: `${backendDomin}/api/user/all-users`, method: "GET" },
  update_user: { url: `${backendDomin}/api/user/update-user`, method: "POST" },
  current_user: { url: `${backendDomin}/api/user/user-details`, method: "GET" },
  upload_product: {
    url: `${backendDomin}/api/product/upload-product`,
    method: "POST",
  },
  get_product: {
    url: `${backendDomin}/api/product/get-product`,
    method: "GET",
  },
  edit_product: {
    url: `${backendDomin}/api/product/edit-product`,
    method: "POST",
  },
  get_category: {
    url: `${backendDomin}/api/product/get-category`,
    method: "GET",
  },
};
