import express from "express";
import userRoutes from "./users";
import vehicleRoutes from "./vehicles";
import driverRoutes from "./drivers";
import routeRoutes from "./routes";
import dispatchRoutes from "./dispatches";
import quotaRoutes from "./quotas";
import cooperativeRoutes from "./cooperatives";

const router = express.Router();

router.use(userRoutes);
router.use(vehicleRoutes);
router.use(driverRoutes);
router.use(routeRoutes);
router.use(dispatchRoutes);
router.use(quotaRoutes);
router.use(cooperativeRoutes);

export default router;
