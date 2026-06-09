import { 
    insertUser, 
    getUsers,
    getUserById,
    getUserBySearch,
    getUserByStatus,
    getUserByRole,
    updateUser,
    deleteUser
} from "../db/queries/userQueries";
import logger from "../utils/logger";
import { isValidPattern, emailPattern } from "../utils/regexValidator";
import { validatePasswordLength } from "../utils/validatePassLength";

export async function createUserService(data:any, res: Response, req: Request ) {
    // Validation layers
    if (!data.email) {
        logger.error("Email is required");
        throw new Error("Email is required");
    }

    if (!data.firstName) {
        logger.error("First name is required");
        throw new Error("First name is required");
    }

    if (!data.lastName) {
        logger.error("Last name is required");
        throw new Error("Last name is required");
    }

    if (!data.email) {
        logger.error("Email is required");
        throw new Error("Email is required");
    }

    // Regex validation for email
    const validatedEmail = isValidPattern(data.email, emailPattern);
    if (!validatedEmail) {
        logger.error("Invalid email");
        throw new Error("Invalid email");
    }

    if (!data.password) {
        logger.error("Password is required")
        throw new Error("Password is Required")
    }

    if (!validatePasswordLength(data.password)) {
        logger.error("Password length must be at least 8 characters long")
        throw new Error("Password length must be at least 8 characters long")
    }

    // Insert user to database after validation layer
    return await insertUser(data);
}