import { Request, Response } from "express";
import {
    createQuotaService,
    fetchAllQuotasService,
    fetchQuotaByIdService,
    fetchQuotasByRouteIdService,
    updateQuotaService,
    deleteQuotaService
} from "../service/quotaService";
import logger from "../utils/logger";
import { CreateQuotaDTO, UpdateQuotaDTO } from "../db/dto/quotaDTO";

// Controller function to create new quota
export async function createQuota(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const quota: CreateQuotaDTO = req.body;

        const quotas = await createQuotaService(quota, cooperativeId);
        logger.info(`Quota for route: ${quota.routeId} Created Successfully`);
        res.status(201).json({
            success: true,
            message: `Quota for route: ${quota.routeId} Created Successfully`,
            quotas
        })
    } catch (error: any) {
        logger.error("Failed to create quota");
        res.status(400).json({
            success: false,
            message: `Create Quota Controller: ${error.message}`
        })
    }
}

// Controller function to fetch all quotas
export async function getQuotas(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const quotas = await fetchAllQuotasService(cooperativeId, page, limit);
        logger.info("Quotas fetched successfully");
        res.status(200).json({
            success: true,
            message: "Quotas fetched successfully",
            quotas
        })
    } catch (error: any) {
        logger.error("Failed to fetch quotas")
        res.status(400).json({
            success: false,
            message: `Get Quotas Controller: ${error.message}`
        })
    }
}

// Controller function to fetch quota by ID
export async function getQuotaById(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const quotaId = String(req.params.qoutaId);

        const quota = await fetchQuotaByIdService(cooperativeId, quotaId);
        logger.info("Quota fetched successfully")
        res.status(200).json({
            success: true,
            message: `Quota: ${quotaId} fetched successfully`,
            quota
        })
    } catch (error: any) {
        logger.error("Failed to fetch quota");
        res.status(400).json({
            success: false,
            message: `Get Quota by ID Controller: ${error.message}`
        })
    }
}

// Controller function to fetch quotas by route ID
export async function getQuotasByRoute(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const routeId = String(req.query.route) || "";
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const quotas = await fetchQuotasByRouteIdService(cooperativeId, routeId, page, limit);
        logger.info(`Quotas for route: ${routeId} fetched successfully`);
        res.status(200).json({
            success: true,
            message: `Quotas for route: ${routeId} fetched successfully`,
            quotas
        })
    } catch (error: any) {
        logger.error("Failed to fetch quotas by route");
        res.status(400).json({
            success: false,
            message: `Get Quotas by Route Controller: ${error.message}`
        })
    }
}

// Controller function to update quota
export async function updateQuota(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const quotaId = String(req.params.quotaId);
        const data: UpdateQuotaDTO = req.body;

        const quota = await updateQuotaService(cooperativeId, quotaId, data);
        logger.info(`Quota: ${quotaId} updated successfully`);
        res.status(200).json({
            success: true,
            message: `Quota: ${quotaId} updated successfully`,
            quota
        })
    } catch (error: any) {
        logger.error("Failed to update quota");
        res.status(400).json({
            success: false,
            message: `Update Quota Controller: ${error.message}`
        })
    }
}

// Controller function to delete quota
export async function deleteQuota(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const quotaId = String(req.params.quotaId);

        const quota = await deleteQuotaService(cooperativeId, quotaId);
        logger.info(`Quota: ${quotaId} deleted successfully`);
        res.status(200).json({
            success: true,
            message: `Quota: ${quotaId} deleted successfully`,
            quota
        })
    } catch (error: any) {
        logger.error("Failed to delete quota");
        res.status(400).json({
            success: false,
            message: `Delete Quota Controller: ${error.message}`
        })
    }
}
