import axios from "axios";
import { MemoryItemData } from "../models/MemoryItem.model";
import { AddMemoryItemData } from "../models/AddMemoryItemData.model";

interface SubmitResult {
    success: boolean;
    memoryItemData?: MemoryItemData;
    errors?: string;
}

const addMemoryUrl =
  import.meta.env.VITE_ADD_MEMORY_ITEM_URL;

export async function handleSubmit(formData: AddMemoryItemData, displayErrorMessage: (message: string) => void) : Promise<SubmitResult> {
    const { isValid, errors } = validateMemoryForm(formData);

    if (!isValid) {
        displayErrorMessage(errors);
        return { success: false, errors };
    }

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
        displayErrorMessage(errorMessage);
        return {success: false};
    }
}

function validateMemoryForm(formData: AddMemoryItemData): { isValid: boolean; errors: string; } {
    let errors: string[] = [];

    if (!isNameOrNicknameDefined(formData)) {
        errors.push("יש למלא שם פרטי או כינוי.");
    }

    if (!isRelationDefined(formData.relation)) {
        errors.push("יש למלא מערכת יחסים.");
    }

    if (!isMessageDefined(formData.message)) {
        errors.push("יש למלא תיאור.");
    }

    return {
        isValid: errors.length === 0,
        errors: errors.join('\n')
    }
}

function isNameOrNicknameDefined(formData: AddMemoryItemData) {
    return formData.firstName.trim() !== '' || formData.nickname.trim() !== '';
}

function isRelationDefined(relation: string) {
    return relation.trim() !== '';
}

function isMessageDefined(message: string) {
    return message.trim() !== '';
}
