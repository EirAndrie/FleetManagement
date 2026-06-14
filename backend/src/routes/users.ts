import express from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    getUserBySearch,
    getUserByStatus,
    getUserByRole,
    updateUser,
    deleteUser
} from "../controllers/userController";
import { validateParams } from "../middleware/validateParams";

const router = express.Router();

// Create User Router
router.post(
    "/cooperatives/:cooperativeId/users", 
    validateParams("cooperativeId"),    
    createUser
);

// Fetch Users Router
router.get(
    "/cooperatives/:cooperativeId/users", 
    validateParams("cooperativeId"),
    (req, res) => {
        if (req.query.search) {
            return getUserBySearch(req, res);
        }

        if (req.query.status) {
            return getUserByStatus(req, res);
        }

        if (req.query.role) {
            return getUserByRole(req, res);
        }

        return getAllUsers(req, res);
    }
);

// Fetch User By ID Router
router.get(
    "/cooperatives/:cooperativeId/users/:userId", 
    validateParams("cooperativeId", "userId"),
    getUserById
);

// Update User Router
router.patch(
    "/cooperatives/:cooperativeId/users/:userId", 
    validateParams("cooperativeId", "userId"),
    updateUser
);

// Delete User Router
router.delete(
    "/cooperatives/:cooperativeId/users/:userId", 
    validateParams("cooperativeId", "userId"),
    deleteUser
);

export default router;
