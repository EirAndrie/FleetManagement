export type CreateQuotaDTO = {
    routeId: string;
    maxVehicles: string;
    targetQuota: number;
}

export type UpdateQuotaDTO = {
    routeId?: string;
    maxVehicles?: string;
    targetQuota?: number;
}
