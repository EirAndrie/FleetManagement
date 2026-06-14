import {
    insertQuota,
    getQuotas,
    getQuotaById,
    getQuotasByRouteId,
    updateQuota,
    deleteQuota
} from "../db/queries/quotaQueries";
import logger from "../utils/logger";
import { NewQuotas } from "../db";
import { CreateQuotaDTO, UpdateQuotaDTO } from "../db/dto/quotaDTO";
import { Pagination } from "../utils/pagination";



// Function to create new quota
export async function createQuotaService(
    dto: CreateQuotaDTO,
    cooperativeId: string
) {
    // Validation layer
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    if (!dto.routeId) {
        logger.info("Route ID is required")
        console.warn("Route ID is required")
    }

    if (!dto.maxVehicles) {
        logger.info("Max vehicles is required")
        console.warn("Max vehicles is required")
    }

    if (!dto.targetQuota && dto.targetQuota !== 0) {
        logger.info("Target quota is required")
        console.warn("Target quota is required")
    }

    // Quota payload
    const quotaData: NewQuotas = {
        cooperativeId,
        routeId: dto.routeId,
        maxVehicles: dto.maxVehicles,
        targetQuota: dto.targetQuota
    }

    return await insertQuota(quotaData)
}



// Function to fetch all quotas in a cooperative
export async function fetchAllQuotasService(
    cooperativeId: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    // Pagination
    const {
        offset,
        limit: pageSize
    } = await Pagination(page, limit);

    const quotas = await getQuotas(cooperativeId, pageSize, offset)

    if (quotas.length === 0) {
        logger.info("No quotas found")
        console.warn("No quotas found")
    }

    return quotas;
}



// Function to fetch quota by ID
export async function fetchQuotaByIdService(
    cooperativeId: string,
    quotaId: string
) {
    if (!cooperativeId || !quotaId) {
        throw new Error("Missing required IDs");
    }
    
    const quota = await getQuotaById(cooperativeId, quotaId);

    if (!quota) {
        logger.info(`Quota: ${quotaId} not found`);
        console.warn(`Quota: ${quotaId} not found`)
    }

    return quota
}



// Function to fetch quotas by route ID
export async function fetchQuotasByRouteIdService(
    cooperativeId: string,
    routeId: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    if (!routeId) {
        throw new Error("Missing route ID")
    }

    // Pagination
    const {
        offset,
        limit: pageSize
    } = await Pagination(page, limit);

    const quotas = await getQuotasByRouteId(cooperativeId, routeId, pageSize, offset)

    if (!quotas) {
        logger.info(`Quotas for route ${routeId} not found`)
        console.warn(`Quotas for route ${routeId} not found`)
    }

    return quotas;
}



// Function to update quota
export async function updateQuotaService(
    cooperativeId: string,
    quotaId: string,
    data: UpdateQuotaDTO
) {
    if (!cooperativeId || !quotaId) {
        throw new Error("Missing required IDs");
    }

    const quota = await updateQuota(cooperativeId, quotaId, data)

    if (!quota) {
        logger.info(`Quota: ${quotaId} not found`);
        console.warn(`Quota: ${quotaId} not found`)
    }

    return quota;
}



// Function to delete quota
export async function deleteQuotaService(
    cooperativeId: string,
    quotaId: string,
) {
    if (!cooperativeId || !quotaId) {
        throw new Error("Missing required IDs");
    }

    const quota = await deleteQuota(cooperativeId, quotaId)

    if (!quota) {
        logger.info(`Quota to delete: ${quotaId} not found`)
        console.warn(`Quota to delete: ${quotaId} not found`)
    }

    return quota;
}
