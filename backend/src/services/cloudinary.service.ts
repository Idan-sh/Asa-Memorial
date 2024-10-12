import axios from "axios";
import { Response } from "express"; 

interface CloudinaryResource {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
}

// Cloudinary API
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

/**
 * Fetches all images from a specific Cloudinary folder and returns them in JSON format.
 * @param folder - The name of the Cloudinary folder.
 * @param res - The Express response object to send the JSON data.
 */
export async function fetchCloudinaryImages(folder: string, res: Response) {
  if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.log("Error: Cloudinary API keys undefined.");
    res.status(500).send("Cloudinary API keys are not configured.");
    return;
  }

    try {        
        const response = await axios.get(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/by_asset_folder?asset_folder=${folder}`,
          {
            auth: {
              username: CLOUDINARY_API_KEY,
              password: CLOUDINARY_API_SECRET,
            },
          }
        );
    
        const images = response.data.resources.map((resource: CloudinaryResource) => ({
          url: resource.secure_url,
          public_id: resource.public_id,
          width: resource.width,
          height: resource.height,
        }));
    
        res.json(images); // Send the images as a JSON response.
      } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).send('Error fetching images');
      }
}

