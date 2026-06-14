import { Request, Response } from "express";
import {
    createCooperativeService,
    fetchCooperativeByIdService,
    updateCooperativeService,
    deleteCooperativeService
} from "../service/cooperativeService";
import logger from "../utils/logger";
import { CreateCooperativeDTO, UpdateCooperativeDTO } from "../db/dto/cooperativeDTO";

export async function createCooperative(req: Request, res: Response) {
    try {
        const cooperative: CreateCooperativeDTO = req.body;

        const result = await createCooperativeService(cooperative);
        logger.info(`Cooperative: ${cooperative.name} created successfully`);
        res.status(201).json({
            success: true,
            message: `Cooperative: ${cooperative.name} created successfully`,
            cooperative: result
        });
    } catch (error: any) {
        logger.error("Failed to create cooperative");
        res.status(400).json({
            success: false,
            message: `Create Cooperative Controller: ${error.message}`
        });
    }
}

export async function getCooperativeById(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const id = String(req.params.id);

        if (cooperativeId && id && cooperativeId !== id) {
            logger.warn(`Cooperative ID path mismatch: ${cooperativeId} vs ${id}`);
        }

        const cooperative = await fetchCooperativeByIdService(id);
        logger.info("Cooperative fetched successfully");
        res.status(200).json({
            success: true,
            message: `Cooperative: ${id} fetched successfully`,
            cooperative
        });
    } catch (error: any) {
        logger.error("Failed to fetch cooperative");
        res.status(400).json({
            success: false,
            message: `Get Cooperative by ID Controller: ${error.message}`
        });
    }
}

export async function updateCooperative(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const id = String(req.params.id);
        const data: UpdateCooperativeDTO = req.body;

        if (cooperativeId && id && cooperativeId !== id) {
            logger.warn(`Cooperative ID path mismatch: ${cooperativeId} vs ${id}`);
        }

        const cooperative = await updateCooperativeService(id, data);
        logger.info(`Cooperative: ${id} updated successfully`);
        res.status(200).json({
            success: true,
            message: `Cooperative: ${id} updated successfully`,
            cooperative
        });
    } catch (error: any) {
        logger.error("Failed to update cooperative");
        res.status(400).json({
            success: false,
            message: `Update Cooperative Controller: ${error.message}`
        });
    }
}

export async function deleteCooperative(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const id = String(req.params.id);

        if (cooperativeId && id && cooperativeId !== id) {
            logger.warn(`Cooperative ID path mismatch: ${cooperativeId} vs ${id}`);
        }

        const cooperative = await deleteCooperativeService(id);
        logger.info(`Cooperative: ${id} deleted successfully`);
        res.status(200).json({
            success: true,
            message: `Cooperative: ${id} deleted successfully`,
            cooperative
        });
    } catch (error: any) {
        logger.error("Failed to delete cooperative");
        res.status(400).json({
            success: false,
            message: `Delete Cooperative Controller: ${error.message}`
        });
    }
}
