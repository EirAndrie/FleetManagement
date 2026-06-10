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
import { CreateUserDTO } from "../db/dto/userDTO";
import { hashPassword } from "../utils/passwordHasher";




// Function to create new user
export async function createUserService(
    dto: CreateUserDTO,
    cooperativeId: string
) {
    // validation (DTO level)
    if (!dto.email) throw new Error("Email is required");
    if (!dto.firstName) throw new Error("First name is required");
    if (!dto.lastName) throw new Error("Last name is required");

    const validatedEmail = isValidPattern(dto.email, emailPattern);
    if (!validatedEmail) throw new Error("Invalid email");

    if (!dto.passwordHash || dto.passwordHash.length < 8) {
        throw new Error("Password must be at least 8 characters");
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
export async function fetchAllUsersService(cooperativeId: string) {
    const users = await getUsers(cooperativeId);

    if (users.length === 0) {
        logger.info("No Users Found");
        console.warn("No Users Found");
    }

    // Return users being fetched
    return users;
}



// Function to fetch user by its ID
export async function fetchUserById(
    userId: string, 
    cooperativeId: string
) {
    const user = await getUserById(userId, cooperativeId);

    if (!user) {
        logger.info(`User ${userId} not found`);
        console.warn(`User ${userId} not found`);
    }

    // Return user being fetched
    return user;
}



// Function to fetch user by search terms
export async function fetchUserBySearch(
    cooperativeId: string, 
    searchTerm: any
) {
    const user = await getUserBySearch(cooperativeId, searchTerm);

    if (!user) {
        logger.info(`User ${searchTerm} not found`);
        console.warn(`User ${searchTerm} not found`);
    }

    return user;
}



// Function to fetch user by their status
export async function fetchUserByStatus(
    status: string,
    cooperativeId: string
) {
    const user = await getUserByStatus(status, cooperativeId);

    if (!user) {
        logger.info("User not found")
        throw new Error("User not found")
    }

    return user;
}



// Function to fetch user by their role
export async function fetchUserByRole(
    role: string,
    cooperativeId: string
) {
    const user = await getUserByRole(role, cooperativeId);

    if (!user) {
        logger.info("User not found")
        throw new Error("User not found")
    }

    return user;
}



// Function to update user data
export async function updateUserData(data: NewUsers) {

}