import express from "express";
import {
    createDispatch,
    getDispatches,
    getDispatchById,
    getDispatchesByStatus,
    getDispatchesByRoute,
    getDispatchesByDriver,
    getDispatchesByVehicle,
    getDispatchesByUser,
    getDispatchesByDate,
    updateDispatch,
    deleteDispatch
} from "../controllers/dispatchController";
import { validateParams } from "../middleware/validateParams";

const router = express.Router();

// Create Dispatch Router
router.post(
    "/cooperatives/:cooperativeId/dispatches", 
    validateParams("cooperativeId"),
    createDispatch
);

// Fetch Dispatches Router
router.get(
    "/cooperatives/:cooperativeId/dispatches", 
    validateParams("cooperativeId"),
    (req, res) => {
        if (req.query.status) {
            return getDispatchesByStatus(req, res);
        }

        if (req.query.date) {
            return getDispatchesByDate(req, res);
        }

        return getDispatches(req, res);
    }
);

// Fetch Dispatch By ID Router
router.get(
    "/cooperatives/:cooperativeId/dispatches/:dispatchId", 
    validateParams("cooperativeId", "dispatchId"),
    getDispatchById
);

// Fetch Dispatches by Routes Router
router.get(
    "/cooperatives/:cooperativeId/routes/:routeId/dispatches", 
    validateParams(),
    getDispatchesByRoute
);

// Fetch Dispatches By Driver Router
router.get(
    "/cooperatives/:cooperativeId/drivers/:driverId/dispatches", 
    validateParams("cooperativeId", "driverId"),
    getDispatchesByDriver
);

// Fetch Dispatches By Vehicle Router
router.get(
    "/cooperatives/:cooperativeId/vehicles/:vehicleId/dispatches", 
    validateParams("cooperativeId", "vehicleId"),
    getDispatchesByVehicle
);

// Fetch Dispatches By Users Who Performs Dispatch Router
router.get(
    "/cooperatives/:cooperativeId/users/:id/dispatches", 
    validateParams("cooperativeId", "userId"),
    getDispatchesByUser
);

// Update Dispatch Router
router.patch(
    "/cooperatives/:cooperativeId/dispatches/:dispatchId", 
    validateParams("cooperativeId", "dispatchId"),
    updateDispatch
);

// Delete Dispatch Router
router.delete(
    "/cooperatives/:cooperativeId/dispatches/:dispatchId", 
    validateParams("cooperativeId", "dispatchId"),
    deleteDispatch
);

export default router;
