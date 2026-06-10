import { Request, Response } from "express";
import { 
    createUserService,
    fetchAllUsersService,
    fetchUserById,
    fetchUserByRole,
    fetchUserBySearch,
    fetchUserByStatus
} from "../service/userService";
import logger from "../utils/logger";

// Controller function to create new user
export async function createUser(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId)
        
        const users = await createUserService(req.body, cooperativeId);
        logger.info("User Created Successfully")
        res.status(201).json({
            success: false,
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
        const cooperativeId = String(req.params.cooperativeId)

        const users = await fetchAllUsersService(cooperativeId);
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
        const cooperativeId = String(req.params.cooperativeID)

        if (!userId || !cooperativeId) {
            return res.status(400).json({
                success: false,
                message: "Missing userId or cooperativeId"
            });
        }

        const user = await fetchUserById(userId, cooperativeId);

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
        const searchTerm = req.params.searchTerm;

        const user = await fetchUserBySearch(cooperativeId, searchTerm);
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
        const status = String(req.params.status);
        const cooperativeId = String(req.params.cooperativeId)

        const users = await fetchUserByStatus(status, cooperativeId);
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
        const role = String(req.params.role);
        const cooperativeId = String(req.params.cooperativeId);

        const users = await fetchUserByRole(role, cooperativeId);
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