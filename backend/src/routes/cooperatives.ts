import express from "express";
import {
    createCooperative,
    getCooperativeById,
    updateCooperative,
    deleteCooperative
} from "../controllers/cooperativeController";

const router = express.Router();

router.post("/cooperatives", createCooperative);
router.get("/cooperatives/:cooperative_Id/cooperative/:id", getCooperativeById);
router.patch("/cooperatives/:cooperative_Id/cooperative/:id", updateCooperative);
router.delete("/cooperatives/:cooperative_Id/cooperative/:id", deleteCooperative);

export default router;
