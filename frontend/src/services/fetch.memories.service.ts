import axios from "axios";
import { MemoryItemData } from "../models/MemoryItem.model";

const fetchMemoriesUrl = import.meta.env.VITE_FETCH_MEMORIES_URL;
const fetchMemoryUrl = import.meta.env.VITE_FETCH_MEMORY_URL;

interface FetchMemoriesResult {
    success: boolean;
    memories?: MemoryItemData[];
}

interface FetchMemoryResult {
    success: boolean;
    memory?: MemoryItemData;
}

export async function fetchMemories(limit?: number) : Promise<FetchMemoriesResult> {
    try {
        const response = await axios.get<FetchMemoriesResult>(fetchMemoriesUrl, {
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

export async function fetchMemory(id: string ): Promise<FetchMemoryResult> {
    try{
        const response = await axios.get<FetchMemoryResult>(fetchMemoryUrl + "/" + id, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return {success: true, memory: response.data.memory};
    } catch (err) {
        const errorMessage = axios.isAxiosError(err) && err.response
        ? `Error: ${err.response.statusText}`
        : 'An unknown error occurred.';
        console.log("Error fetching memory... \n" + errorMessage);    

        return {success: false};
    }
}