import express from "express";
import {
    createQuota,
    getQuotas,
    getQuotaById,
    getQuotasByRoute,
    updateQuota,
    deleteQuota
} from "../controllers/quotaController";
import { validateParams } from "../middleware/validateParams";

const router = express.Router();

// Create Quota Router
router.post(
    "/cooperatives/:cooperativeId/quotas", 
    validateParams("cooperativeId"),
    createQuota
);

// Fetch Qouta Router
router.get(
    "/cooperatives/:cooperativeId/quotas", 
    validateParams("cooperativeId"),
    (req, res) => {
        if (req.query.route) {
            return getQuotasByRoute(req, res);
        }

        return getQuotas(req, res);
    }
);

// Fetch Quota by ID Router
router.get(
    "/cooperatives/:cooperativeId/quotas/:quotaId", 
    validateParams("cooperativeId", "quotaId"),
    getQuotaById
);

// Update Quota Router
router.patch(
    "/cooperatives/:cooperativeId/quotas/:quotaId", 
    validateParams("cooperativeId", "quotaId"),
    updateQuota
);

// Delete Quota Router
router.delete(
    "/cooperatives/:cooperativeId/quotas/:quotaId", 
    validateParams("cooperativeId", "quotaId"),
    deleteQuota
);

export default router;
