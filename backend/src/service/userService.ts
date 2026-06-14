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
// Types for user
import { NewUsers } from "../db";
import { CreateUserDTO, UpdateUserDTO } from "../db/dto/userDTO";
import { hashPassword } from "../utils/passwordHasher";
import { Pagination } from "../utils/pagination";



// Function to create new user
export async function createUserService(
    dto: CreateUserDTO,
    cooperativeId: string
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    // validation (DTO level)
    if (!dto.email) {
        logger.info("Email is Required")
        console.warn("Email is required");
    }

    if (!dto.firstName) {
        logger.info("First Name is required")
        console.warn("First name is required");
    }

    if (!dto.lastName) {
        logger.info("Last Name is required");
        console.warn("Last name is required");
    }

    const validatedEmail = isValidPattern(dto.email, emailPattern);
    if (!validatedEmail) {
        logger.info("Invalid email format")
        console.warn("Invalid email format");
    }

    if (!dto.passwordHash) {
        logger.info("Password is Required")
        console.warn("Password is Required");
    }

    if (!validatePasswordLength(dto.passwordHash)) {
        logger.info("Password must be at least 8 characters long")
        console.warn("Password must be at least 8 characters long")
    }

    // transformation
    const passwordHash = await hashPassword(dto.passwordHash);

    // DB payload construction
    const userData: NewUsers = {
        cooperativeId,
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        email: dto.email,
        passwordHash,
        role: dto.role,
        status: "Active",
    };

    return await insertUser(userData);
}



// Function to fetch all users in a cooperative only not all users
export async function fetchAllUsersService(
    cooperativeId: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    // Pagination
    const {
        offset, 
        limit: pageSize
    } = await Pagination(page, limit);
    
    const users = await getUsers(
        cooperativeId, pageSize, offset
    );

    if (users.length === 0) {
        logger.info("No Users Found");
        console.warn("No Users Found");
    }

    // Return users being fetched
    return users;
}



// Function to fetch user by its ID
export async function fetchUserByIdService(
    userId: string, 
    cooperativeId: string
) {
    if (!cooperativeId || !userId) {
        throw new Error("Missing required IDs")
    }
    
    const user = await getUserById(userId, cooperativeId);

    if (!user) {
        logger.info(`User ${userId} not found`);
        console.warn(`User ${userId} not found`);
    }

    // Return user being fetched
    return user;
}



// Function to fetch user by search terms
export async function fetchUserBySearchService(
    cooperativeId: string, 
    searchTerm: any,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    // Pagination
    const {
        offset, 
        limit: pageSize
    } = await Pagination(page, limit);

    const user = await getUserBySearch(
        cooperativeId, searchTerm, pageSize, offset
    );

    if (!user) {
        logger.info(`User ${searchTerm} not found`);
        console.warn(`User ${searchTerm} not found`);
    }

    return user;
}



// Function to fetch user by their status
export async function fetchUserByStatusService(
    status: string,
    cooperativeId: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    // Pagination
    const {
        offset, 
        limit: pageSize
    } = await Pagination(page, limit);

    const user = await getUserByStatus(
        status, cooperativeId, pageSize, offset
    );

    if (!user) {
        logger.info("User not found")
        console.warn("User not found")
    }

    return user;
}



// Function to fetch user by their role
export async function fetchUserByRoleService(
    role: string,
    cooperativeId: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    // Pagination
    const {
        offset, 
        limit: pageSize
    } = await Pagination(page, limit);
    
    const user = await getUserByRole(
        role, cooperativeId, pageSize, offset
    );

    if (!user) {
        logger.info("User not found")
        console.warn("User not found")
    }

    return user;
}



// Function to update user data
export async function updateUserDataService(
    data: UpdateUserDTO,
    userId: string,
    cooperativeId: string
) {
    if (!cooperativeId || !userId) {
        throw new Error("Missing required IDs")
    }

    const user = await updateUser(data, userId, cooperativeId);

    if (!user) {
        logger.info(`User: ${userId} not found`);
        console.warn(`User: ${userId} not found`);
    }

    return user;
}



// Function to delete user
export async function deleteUserDataService(
    userId: string, 
    cooperativeId: string
) {
    if (!cooperativeId || !userId) {
        throw new Error("Missing required IDs")
    }
    
    const user = await deleteUser(userId, cooperativeId);

    if (!user) {
        logger.info(`User to delete: ${userId} not found`)
        console.warn(`User to delete: ${userId} not found`)
    }

    return user;
}