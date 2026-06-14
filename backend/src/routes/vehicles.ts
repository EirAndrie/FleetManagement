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

const router = express.Router();

router.post("/cooperatives/:cooperativeId/vehicles", createVehicle);
router.get("/cooperatives/:cooperativeId/vehicles", (req, res) => {
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
});
router.get("/cooperatives/:cooperativeId/vehicles/:vehicleId", getVehicleById);
router.patch("/cooperatives/:cooperativeId/vehicles/:vehicleId", updateVehicle);
router.delete("/cooperatives/:cooperativeId/vehicles/:vehicleId", deleteVehicle);

export default router;
