import axios from "axios";

const fetchCloudinaryImagesUrl = import.meta.env
  .VITE_FETCH_CLOUDINARY_IMAGES_URL;

export async function fetchCloudinaryImage(folderName: string) {
    try {
        const response = await axios.get(fetchCloudinaryImagesUrl + `/${folderName}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return {success: true, images: response.data};
    } catch (err) {
        const errorMessage = axios.isAxiosError(err) && err.response
        ? `Error: ${err.response.statusText}`
        : 'An unknown error occurred.';
        console.log(`Error fetching Cloudinary images for folder: ${folderName}... \n` + errorMessage);

        return {success: false};
    };
}