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

const router = express.Router();

router.post("/cooperatives/:cooperativeId/dispatches", createDispatch);
router.get("/cooperatives/:cooperativeId/dispatches", (req, res) => {
    if (req.query.status) {
        return getDispatchesByStatus(req, res);
    }

    if (req.query.date) {
        return getDispatchesByDate(req, res);
    }

    return getDispatches(req, res);
});
router.get("/cooperatives/:cooperativeId/dispatches/:id", getDispatchById);
router.get("/cooperatives/:cooperativeId/routes/:id/dispatches", getDispatchesByRoute);
router.get("/cooperatives/:cooperativeId/drivers/:id/dispatches", getDispatchesByDriver);
router.get("/cooperatives/:cooperativeId/vehicles/:id/dispatches", getDispatchesByVehicle);
router.get("/cooperatives/:cooperativeId/users/:id/dispatches", getDispatchesByUser);
router.patch("/cooperatives/:cooperativeId/dispatches/:id", updateDispatch);
router.delete("/cooperatives/:cooperativeId/dispatches/:id", deleteDispatch);

export default router;
