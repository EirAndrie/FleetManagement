import express from "express";
import {
    createCooperative,
    getCooperativeById,
    updateCooperative,
    deleteCooperative
} from "../controllers/cooperativeController";
import { validateParams } from "../middleware/validateParams";

const router = express.Router();

// Create Cooperative Router
router.post("/cooperatives", createCooperative);

// Fetch Cooperative By Cooperative Id Router (ADMIN ONLY)
router.get(
    "/cooperatives/:cooperativeId/cooperative/:id", 
    validateParams("cooperativeId", "id"),
    getCooperativeById
);

// Update Cooperative Router
router.patch(
    "/cooperatives/:cooperativeId/cooperative/:id", 
    validateParams("cooperativeId", "id"),
    updateCooperative
);

// Delete Cooperative Router
router.delete(
    "/cooperatives/:cooperativeId/cooperative/:id", 
    validateParams("cooperativeId", "id"),
    deleteCooperative
);

export default router;
