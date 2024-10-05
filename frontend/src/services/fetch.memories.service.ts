import axios from "axios";
import { MemoryItemData } from "../models/MemoryItem.model";

const fetchMemoriesUrl = import.meta.env.VITE_FETCH_MEMORIES_URL;

interface fetchMemoriesResult {
    success: boolean;
    memories?: MemoryItemData[];
}

export async function fetchMemories(limit?: number) : Promise<fetchMemoriesResult>{
    try {
        const response = await axios.get<fetchMemoriesResult>(fetchMemoriesUrl, {
            params: { limit },
            headers: {
                "Content-Type": "application/json",
            }
        });
        return {success: true, memories: response.data.memories};
    } catch (err) {
        const errorMessage = axios.isAxiosError(err) && err.response
        ? `Error: ${err.response.statusText}`
        : 'An unknown error occurred.';
        console.log("Error fetching memories... \n" + errorMessage);

        return {success: false};
    }
}