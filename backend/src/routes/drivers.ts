import express from "express";
import {
    createDriver,
    getDrivers,
    getDriverById,
    getDriverBySearch,
    getDriverByStatus,
    updateDriver,
    deleteDriver
} from "../controllers/driverController";
import { validateParams } from "../middleware/validateParams";

const router = express.Router();

// Create Driver Router
router.post(
    "/cooperatives/:cooperativeId/drivers", 
    validateParams("cooperativeId"),
    createDriver
);

// Fetch Drivers Router
router.get(
    "/cooperatives/:cooperativeId/drivers", 
    validateParams("cooperativeId"),
    (req, res) => {
        if (req.query.search) {
            return getDriverBySearch(req, res);
        }

        if (req.query.status) {
            return getDriverByStatus(req, res);
        }

        return getDrivers(req, res);
    }
);

// Fetch Driver BY ID Router
router.get(
    "/cooperatives/:cooperativeId/drivers/:driverId", 
    validateParams("cooperativeId", "driverId"),
    getDriverById
);

// Update Driver Router
router.patch(
    "/cooperatives/:cooperativeId/drivers/:driverId", 
    validateParams("cooperativeId", "driverId"),
    updateDriver
);

// Delete Driver Router
router.delete(
    "/cooperatives/:cooperativeId/drivers/:driverId", 
    validateParams("cooperativeId", "driverId"),
    deleteDriver
);

export default router;
