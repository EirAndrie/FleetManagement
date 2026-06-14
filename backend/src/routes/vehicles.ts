import express from "express";
import {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    getVehicleBySearch,
    getVehicleByFilter,
    getVehicleByStatus,
    updateVehicle,
    deleteVehicle
} from "../controllers/vehicleController";
import { validateParams } from "../middleware/validateParams";

const router = express.Router();

// Create Vehicle Router
router.post(
    "/cooperatives/:cooperativeId/vehicles", 
    validateParams("cooperativeId"),
    createVehicle
);

// Fetch Vehicles Router
router.get(
    "/cooperatives/:cooperativeId/vehicles", 
    validateParams("cooperativeId"),
    (req, res) => {
        if (req.query['filter[make]'] || req.query['filter[model]'] || req.query['filter[year]']) {
            return getVehicleByFilter(req, res);
        }

        if (req.query.search) {
            return getVehicleBySearch(req, res);
        }

        if (req.query.status) {
            return getVehicleByStatus(req, res);
        }

        return getAllVehicles(req, res);
    }
);

// Fetch Vehicle By ID Router
router.get(
    "/cooperatives/:cooperativeId/vehicles/:vehicleId", 
    validateParams("cooperativeId", "vehicleId"),
    getVehicleById
);

// Update Vehicle Router
router.patch(
    "/cooperatives/:cooperativeId/vehicles/:vehicleId", 
    validateParams("cooperativeId", "vehicleId"),
    updateVehicle
);

// Delete Vehicle Router
router.delete(
    "/cooperatives/:cooperativeId/vehicles/:vehicleId", 
    validateParams("cooperativeId", "vehicleId"),
    deleteVehicle
);

export default router;
