import axios from "axios";
import { MemoryItemData } from "../models/MemoryItem.model";
import { AddMemoryItemData } from "../models/AddMemoryItemData.model";

interface SubmitResult {
    success: boolean;
    memoryItemData?: MemoryItemData;
}

const addMemoryUrl =
  import.meta.env.VITE_ADD_MEMORY_ITEM_URL;

export async function handleSubmit(formData: AddMemoryItemData) : Promise<SubmitResult> {
    // ADD VALIDATIONS

    try {
        const response = await axios.post<MemoryItemData>(addMemoryUrl, formData, {
            headers: {
                "Content-Type": "application/json",
            },});
        return {success: true, memoryItemData: response.data};
    } catch (err) {
        const errorMessage = axios.isAxiosError(err) && err.response
        ? `Error: ${err.response.statusText}`
        : 'An unknown error occurred.';
        console.log("Error submiting memory item... \n" + errorMessage);

        return {success: false};
    }
}