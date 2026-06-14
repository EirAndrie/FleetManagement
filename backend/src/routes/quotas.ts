import express from "express";
import {
    createQuota,
    getQuotas,
    getQuotaById,
    getQuotasByRoute,
    updateQuota,
    deleteQuota
} from "../controllers/quotaController";

const router = express.Router();

router.post("/cooperatives/:cooperativeId/quotas", createQuota);
router.get("/cooperatives/:cooperativeId/quotas", (req, res) => {
    if (req.query.route) {
        return getQuotasByRoute(req, res);
    }

    return getQuotas(req, res);
});
router.get("/cooperatives/:cooperativeId/quotas/:id", getQuotaById);
router.patch("/cooperatives/:cooperativeId/quotas/:id", updateQuota);
router.delete("/cooperatives/:cooperativeId/quotas/:id", deleteQuota);

export default router;
