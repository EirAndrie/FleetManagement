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

const router = express.Router();

router.post("/cooperatives/:cooperativeId/users", createUser);
router.get("/cooperatives/:cooperativeId/users", (req, res) => {
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
});
router.get("/cooperatives/:cooperativeId/users/:userId", getUserById);
router.patch("/cooperatives/:cooperativeId/users/:userId", updateUser);
router.delete("/cooperatives/:cooperativeId/users/:userId", deleteUser);

export default router;
