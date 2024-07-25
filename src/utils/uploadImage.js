const url = ``;

import axios from "axios";

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "mern_product"); // replace with your actual upload preset

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/deyw9xwwr/image/upload", // replace with your Cloudinary cloud name
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};

export default uploadImage;
