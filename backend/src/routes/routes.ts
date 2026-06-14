import express from "express";
import {
    createRoute,
    getRoutes,
    getRouteById,
    getRouteBySearch,
    getRoutesByDistance,
    getRoutesByStatus,
    getRoutesByCode,
    updateRoute,
    deleteRoute
} from "../controllers/routeController";

const router = express.Router();

router.post("/cooperatives/:cooperativeId/routes", createRoute);
router.get("/cooperatives/:cooperativeId/routes", (req, res) => {
    if (req.query.search) {
        return getRouteBySearch(req, res);
    }

    if (req.query.distance) {
        return getRoutesByDistance(req, res);
    }

    if (req.query.status) {
        return getRoutesByStatus(req, res);
    }

    if (req.query.code) {
        return getRoutesByCode(req, res);
    }

    return getRoutes(req, res);
});
router.get("/cooperatives/:cooperativeId/routes/:id", getRouteById);
router.patch("/cooperatives/:cooperativeId/routes/:id", updateRoute);
router.delete("/cooperatives/:cooperativeId/routes/:id", deleteRoute);

export default router;
