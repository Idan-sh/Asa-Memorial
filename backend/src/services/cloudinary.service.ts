import axios from "axios";
import { Response } from "express"; 
import { v2 as cloudinary } from 'cloudinary';
import { Pool } from "pg";
import { FOLDER_NAMES } from "../data/CloudinaryFolderNames";

interface CloudinaryResource {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
    context?: {
      custom: {
        alt?: string;
        description?: string;
      };
    };
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary API
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

/**
 * Fetches all images from a specific Cloudinary folder and returns them in JSON format.
 * @param folderName - The name of the Cloudinary folder.
 * @param res - The Express response object to send the JSON data.
 */
export async function fetchCloudinaryImages(folderName: string, pool: Pool, res: Response) {
  try {
    const query = 'SELECT images FROM album_images WHERE folder_name = $1';
    const values = [folderName];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: `Album ${folderName} not found` });
    }

    res.json({ success: true, images: result.rows[0].images });
  } catch (err) {
    console.error('Error fetching album images from the database', err);
    res.status(500).json({ success: false, message: 'Database error' });
  }
}

export async function fetchCloudinaryCoverImage(folderName: string, res: Response) {
  try {
    const response = await cloudinary.search
      .expression(`folder:${folderName} AND tags:cover`)
      .execute();

    res.json(response.resources);
  } catch (err) {
    console.error("Error fetching cloudinary image with tag. ", err);
    res.status(500).send("Error fetching image with tag.")
  }
}

/**
 * Updates the albums' images from Cloudinary.
 * @param folderNames All albums' folder names, as they were setup in Cloudinary.
 * @param pool Postgres pool object.
 */
export async function updateCloudinaryAlbums(pool: Pool, res: Response) {
  for (const folderName of FOLDER_NAMES) {
    try {
      console.log(`Updating images of album ${folderName}`);
      const response = await cloudinary.search
        .expression(`folder:${folderName}`)
        .execute();

      // Check if the response contains 'resources' and if there are images
      if (!response || !response.resources || response.resources.length === 0) {
        console.log(`No images found for folder: ${folderName}`);
        continue; // Skip this folder and move to the next
      }
      
      const images = response.resources.map((resource: CloudinaryResource) => ({
        url: resource.secure_url,
        public_id: resource.public_id,
        width: resource.width,
        height: resource.height,
        description: resource.context?.custom?.description || "",
        alt: resource.context?.custom?.alt || "Image " + resource.public_id,
      }));

      // Convert image URLs to JSON and upsert into the database
      const query = `
      INSERT INTO album_images (folder_name, images, updated_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (folder_name)
      DO UPDATE SET images = EXCLUDED.images, updated_at = NOW();
    `;
    const values = [folderName, JSON.stringify(images)];
    
    await pool.query(query, values);

    console.log(`Images for folder ${folderName} saved to database.`);
    } catch (err) {
      console.error("Error fetching or saving Cloudinary images: ", err);
      res.status(500).send({success: false, message: "Error fetching or saving Cloudinary images."});
    }
  }
  res.status(200).send({success: true, message: "Successfully apdated all albums' images."});
}
