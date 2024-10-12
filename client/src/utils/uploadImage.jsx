const url = `https://api.cloudinary.com/v1_1/deyw9xwwr/image/upload`;

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "MERN_ECommerce");

  const response = await fetch(url, { method: "POST", body: formData });
  const responseData = await response.json();
  return responseData;
};
