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

const router = express.Router();

router.post("/cooperatives/:cooperativeId/drivers", createDriver);
router.get("/cooperatives/:cooperativeId/drivers", (req, res) => {
    if (req.query.search) {
        return getDriverBySearch(req, res);
    }

    if (req.query.status) {
        return getDriverByStatus(req, res);
    }

    return getDrivers(req, res);
});
router.get("/cooperatives/:cooperativeId/drivers/:driverId", getDriverById);
router.patch("/cooperatives/:cooperativeId/drivers/:driverId", updateDriver);
router.delete("/cooperatives/:cooperativeId/drivers/:driverId", deleteDriver);

export default router;
