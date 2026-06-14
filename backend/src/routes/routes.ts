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
import { validateParams } from "../middleware/validateParams";

const router = express.Router();

// Create Route Router
router.post(
    "/cooperatives/:cooperativeId/routes", 
    validateParams("cooperativeId"),
    createRoute
);

// Get Routes Router
router.get(
    "/cooperatives/:cooperativeId/routes", 
    validateParams("cooperativeId"),
    (req, res) => {
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
    }
);

// Get Route by ID Router
router.get(
    "/cooperatives/:cooperativeId/routes/:routeId", 
    validateParams("cooperativeId", "routeId"),
    getRouteById
);

// Update Route Router
router.patch(
    "/cooperatives/:cooperativeId/routes/:routeId", 
    validateParams("cooperativeId", "routeId"),
    updateRoute
);

// Delete Route Router
router.delete(
    "/cooperatives/:cooperativeId/routes/:routeId", 
    validateParams("cooperativeId", "routeId"),
    deleteRoute
);

export default router;
