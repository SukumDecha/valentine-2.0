export const validateFiles = (files: File[]): string | null => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/webp", "image/svg+xml", "image/HEIC"];

    for (const file of files) {
        if (!ALLOWED_TYPES.includes(file.type)) {
            return `File "${file.name}" is not a supported image type. Please use JPEG, PNG, or GIF.`;
        }
        if (file.size > MAX_FILE_SIZE) {
            return `File "${file.name}" exceeds 5MB size limit.`;
        }
    }
    return null;
};