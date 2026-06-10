declare module "bcrypt";

import bcrypt from "bcrypt";
/**
 * Hashes a plaintext password using bcrypt.
 * @param {string} password - The plain password from the client.
 * @returns {Promise<string>} The securely hashed string.
 */
export async function hashPassword(password:string) {
    const saltRounds = 12; // 12 rounds is optimal for modern CPU security
    return await bcrypt.hash(password, saltRounds);
}

/**
 * Verifies an entered password against an existing hash.
 * @param {string} password - The plaintext password attempt.
 * @param {string} storedHash - The hash retrieved from the database.
 * @returns {Promise<boolean>} True if it matches, false otherwise.
 */
export async function verifyPassword(password:string, storedHash:string) {
    return await bcrypt.compare(password, storedHash);
}

