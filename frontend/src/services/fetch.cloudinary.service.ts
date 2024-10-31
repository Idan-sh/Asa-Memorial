import axios from "axios";

const fetchCloudinaryImagesUrl = import.meta.env
    .VITE_FETCH_CLOUDINARY_IMAGES_URL;

const fetchCloudinaryCoverImageUrl = import.meta.env
    .VITE_FETCH_CLOUDINARY_COVER_IMAGE_URL;

export async function fetchCloudinaryImages(folderName: string) {
    try {
        const response = await axios.get(fetchCloudinaryImagesUrl + `/${folderName}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return { success: true, images: response.data };
    } catch (err) {
        const errorMessage = axios.isAxiosError(err) && err.response
        ? `Error: ${err.response.statusText}`
        : 'An unknown error occurred.';
        console.log(`Error fetching Cloudinary images for folder: ${folderName}... \n` + errorMessage);

        return { success: false };
    };
}

export async function fetchCloudinaryCoverImage(folderName: string) {
    try {
        const response = await axios.get(fetchCloudinaryCoverImageUrl + `/${folderName}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.data.length == 0) {
            return { success: false };
        }
        return { success: true, image: response.data[0].secure_url };
    } catch (err) {
        console.error("Error fetching cover image. " + err);
        return { success: false };
    }
}