import ENV from "../config/env";

/**
 * 
 * @param password - Password for users
 * @param PASSWORD_LENGTH - Defines the required system password length
 * @returns - Boolean value
 */
export async function validatePasswordLength(password: string) {
    // Ensure ENV.PASSWORD_LENGTH is a number; fallback to 8 if undefined or invalid
    const minLength = typeof ENV.PASSWORD_LENGTH === 'number' && !isNaN(ENV.PASSWORD_LENGTH)
        ? ENV.PASSWORD_LENGTH
        : 8;

    if (password.length < minLength) {
        return false;
    }

    return true;
}