import { toast } from "react-toastify";

export const handleError = (error: unknown, defaultMessage?: string) => {
    const message = error instanceof Error ? error.message : defaultMessage;
    toast.error(message);
    throw error;
};


export const handleSuccess = (message: string) => {
    toast.success(message);
};