import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const imageStore = {
  getAllImages: async function() {
    const result = await cloudinary.api.resources();
    return result.resources;
  },

  uploadImage: async function(imagefile: any) {
    try {
        const result = await cloudinary.uploader.upload(imagefile.path);
        return result.url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
  },

  deleteImage: async function(img: string) {
    await cloudinary.uploader.destroy(img, {});
  }
};