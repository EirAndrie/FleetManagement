import { eq, and } from "drizzle-orm";

import { db } from "../../config/connectDB";
import { Quotas } from "../schemas/Quota";
import { NewQuotas } from "../schemas/Quota";
import { UpdateQuotaDTO } from "../dto/quotaDTO";

// Query to insert new quota to the database
export async function insertQuota(
    quota: NewQuotas
) {
    return await db.insert(Quotas)
                    .values(quota)
                    .returning();
}

// Query to get all quotas in a cooperative
export async function getQuotas(
    cooperativeId: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Quotas)
                    .where(eq(Quotas.cooperativeId, cooperativeId))
                    .limit(limit)
                    .offset(offset)
}

// Query to fetch quota by its ID
export async function getQuotaById(
    cooperativeId: string,
    quotaId: string
) {
    return await db.select()
                    .from(Quotas)
                    .where(
                        and(
                            eq(Quotas.cooperativeId, cooperativeId),
                            eq(Quotas.quotaId, quotaId)
                        )
                    )
}

// Query to fetch quotas by route ID
export async function getQuotasByRouteId(
    cooperativeId: string,
    routeId: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Quotas)
                    .where(
                        and(
                            eq(Quotas.cooperativeId, cooperativeId),
                            eq(Quotas.routeId, routeId)
                        )
                    )
                    .limit(limit)
                    .offset(offset)
}

// Query to update quota data
export async function updateQuota(
    cooperativeId: string,
    quotaId: string,
    quota: UpdateQuotaDTO
) {
    return await db.update(Quotas)
                    .set(quota)
                    .where(
                        and(
                            eq(Quotas.quotaId, quotaId),
                            eq(Quotas.cooperativeId, cooperativeId)
                        )
                    )
                    .returning()
}

// Query to delete quota
export async function deleteQuota(
    cooperativeId: string,
    quotaId: string
) {
    return await db.delete(Quotas)
                    .where(
                        and(
                            eq(Quotas.quotaId, quotaId),
                            eq(Quotas.cooperativeId, cooperativeId)
                        )
                    )
}
