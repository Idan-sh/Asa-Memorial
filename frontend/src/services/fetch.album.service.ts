import axios from "axios";

const fetchAlbumImagesUrl = import.meta.env
    .VITE_FETCH_ALBUM_IMAGES_URL;

const fetchAlbumCoverImageUrl = import.meta.env
    .VITE_FETCH_ALBUM_COVER_IMAGE_URL;

export async function fetchAlbumImages(folderName: string) {
    try {
        const response = await axios.get(fetchAlbumImagesUrl + `/${folderName}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (err) {
        const errorMessage = axios.isAxiosError(err) && err.response
        ? `Error: ${err.response.data.message}`
        : 'An unknown error occurred.';
        console.error(`Error fetching Cloudinary images for folder: ${folderName}... \n`, errorMessage);
    };
}

export async function fetchAlbumCoverImage(folderName: string) {
    try {
        const response = await axios.get(fetchAlbumCoverImageUrl + `/${folderName}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.data.length == 0) {
            console.log(`No cover image available for album ${folderName}. `);
            return;
        }
        return response.data[0].secure_url;
    } catch (err) {
        console.error(`Error fetching cover image of album ${folderName}. ` + err);
    }
}