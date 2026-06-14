import { Request, Response } from "express";
import { 
    createUserService,
    deleteUserDataService,
    fetchAllUsersService,
    fetchUserByIdService,
    fetchUserByRoleService,
    fetchUserBySearchService,
    fetchUserByStatusService,
    updateUserDataService 
} from "../service/userService";
import logger from "../utils/logger";
import { CreateUserDTO, UpdateUserDTO } from "../db/dto/userDTO";

// Controller function to create new user
export async function createUser(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId)
        const user: CreateUserDTO = req.body;
        
        const users = await createUserService(user, cooperativeId);
        logger.info("User Created Successfully")
        res.status(201).json({
            success: false,
            message: "User Created Successfully",
            users
        })
    } catch (error: any) {
        logger.error("Failed to Create User")
        res.status(400).json({
            sucess: false,
            message: `Create User Controller: ${error.message}`
        })
    }
}

// Controller function to fetch all users in a cooperative only not all users
export async function getAllUsers(req: Request, res: Response) {
    try {
        // Fetch cooperativeId from parameters
        const cooperativeId = String(req.params.cooperativeId);
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const users = await fetchAllUsersService(cooperativeId, page, limit);
        logger.info("All Users Fetched Successfully")
        res.status(200).json({
            success: true,
            users
        })
    } catch(error:any) {
        logger.error("Failed to fetch all users")
        res.status(400).json({
            success: false,
            message: `Get All Users Controller: ${error.message}`
        })
    }
}

// Controller function to fetch user by ID in a cooperative
export async function getUserById(req: Request, res: Response) {
    try {
        const userId = String(req.params.userId);
        const cooperativeId = String(req.params.cooperativeId)

        if (!userId || !cooperativeId) {
            return res.status(400).json({
                success: false,
                message: "Missing userId or cooperativeId"
            });
        }

        const user = await fetchUserByIdService(userId, cooperativeId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User with ID ${userId} not found in cooperative ${cooperativeId}`
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch(error:any) {
        logger.error("Failed to fetch user")
        res.status(500).json({
            success: false,
            message: `Get User By ID Controller: ${error.message}`
        })
    }
}

// Controller function to fetch user base on search term
export async function getUserBySearch(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId)
        const searchTerm = String(req.query.search || "");
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;


        const user = await fetchUserBySearchService(
            cooperativeId, searchTerm, page, limit
        );
        logger.info(`Found User ${searchTerm} successfully`)
        res.status(201).json({
            success: true,
            message: `User ${searchTerm} found successfully`,
            user
        })
    } catch(error:any) {
        logger.error("Failed to search user")
        res.status(400).json({
            success: false,
            message: `Get User by Search Controller: ${error.message}`
        })
    }
}

// Controller function to fetch user base on status
export async function getUserByStatus(req: Request, res: Response) {
    try {
        const status = String(req.query.status);
        const cooperativeId = String(req.params.cooperativeId)
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const users = await fetchUserByStatusService(
            status, cooperativeId, page, limit
        );
        logger.info(`Status: ${status} users found successfully`)
        res.status(200).json({
            success: true,
            message: `Status: ${status} users found successfully`,
            users
        })
    } catch(error: any) {
        logger.error("Failed to fetch user")
        res.status(400).json({
            success: false,
            message: `Get User by Status Controller: ${error.message}`
        })
    }
}

// Controller function to fetch user base on role
export async function getUserByRole(req: Request, res: Response) {
    try {
        const role = String(req.query.role);
        const cooperativeId = String(req.params.cooperativeId);
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const users = await fetchUserByRoleService(
            role, cooperativeId, page, limit
        );
        logger.info(`Status: ${role} users found successfully`)
        res.status(200).json({
            success: true,
            message: `Status: ${role} users found successfully`,
            users
        })
    } catch(error:any) {
        logger.error("Failed to fetch user")
        res.status(400).json({
            success: false,
            message: `Get User by Role Controller: ${error.message}`
        })
    }
}

// Controller function to update existing user data
export async function updateUser(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const userId = String(req.params.userId);
        const updatedUser: UpdateUserDTO = req.body;

        const user = await updateUserDataService(updatedUser, userId, cooperativeId);
        res.status(201).json({
            success: true,
            message: `User ${userId} Updated successfully`,
            user
        })
    } catch(error:any) {
        logger.error("Failed to update user data")
        res.status(400).json({
            success: false,
            message: `Update User Controller: ${error.message}`
        })
    }
}

// Controller function to delete user
export async function deleteUser(req: Request, res: Response) {
    try {
        const userId = String(req.params.userId);
        const cooperativeId = String(req.params.cooperativeId);

        const user = await deleteUserDataService(userId, cooperativeId)
        res.status(201).json({
            success: true,
            message: `User: ${userId} Deleted successfully`,
            user
        })
    } catch(error:any) {
        logger.error("Failed to delete user")
        res.status(400).json({
            success: false,
            message: `Delete User Controller: ${error.message}`
        })
    }
}