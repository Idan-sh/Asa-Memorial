import axios from "axios";
import { MemoryItemData } from "../models/MemoryItem.model";
import { AddMemoryItemData } from "../models/AddMemoryItemData.model";
import * as EmailValidator from 'email-validator';

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

    validateNames(formData, errors);
    validateRelation(formData.relation, errors);
    validateMessage(formData.message, errors);
    validateEmail(formData.contactEmail, errors);

    return {
        isValid: errors.length === 0,
        errors: errors.join('\n')
    }
}

function validateNames(formData: AddMemoryItemData, errors: string[]) {
    if (formData.firstName.trim() === '' && formData.nickname.trim() === '') {
        errors.push("יש למלא שם פרטי או כינוי.");
    } else if (formData.firstName.trim() !== '' && formData.firstName.trim().length < 2) {
        errors.push("על השם להיות באורך של לפחות שני תווים.");
    } else if (formData.nickname.trim() !== '' && formData.nickname.trim().length < 2) {
        errors.push("על הכינוי להיות באורך של לפחות שני תווים.");
    }
}

function validateRelation(relation: string, errors: string[]) {
    if (relation.trim() === '') {
        errors.push("יש למלא מערכת יחסים.");
    }
}

function validateMessage(message: string, errors: string[]) {
    if (message.trim() === '') {
        errors.push("יש למלא תיאור.");
    } else if (message.length < 10) {
        errors.push("על התיאור להיות באורך של לפחות 10 תווים.");
    }
}

function validateEmail(email: string, errors: string[]) {
    if (!EmailValidator.validate(email)) {
        errors.push("אימייל לא תקין.")
    }
}
