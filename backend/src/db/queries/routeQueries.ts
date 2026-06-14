import { eq, ilike, and, or } from "drizzle-orm";

import { db } from "../../config/connectDB";
import { Routes } from "../schemas/DispatchRoutes";
import { NewRoutes } from "../schemas/DispatchRoutes";
import { UpdateRouteDTO } from "../dto/routeDTO";

// Query to insert new route to the database
export async function insertRoute(
    route: NewRoutes
) {
    return await db.insert(Routes)
                    .values(route)
                    .returning();
}

// Query to get all routes in a cooperative
export async function getRoutes(
    cooperativeId: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Routes)
                    .where(eq(Routes.cooperativeId, cooperativeId))
                    .limit(limit)
                    .offset(offset)
}

// Query to fetch route by its ID
export async function getRouteById(
    cooperativeId: string,
    routeId: string
) {
    return await db.select()
                    .from(Routes)
                    .where(
                        and(
                            eq(Routes.cooperativeId, cooperativeId),
                            eq(Routes.routeId, routeId)
                        )
                    )
}

// Query to fetch route by search keywords
export async function getRouteBySearch(
    cooperativeId: string,
    query: string,
    limit: number,
    offset: number
) {
    const searchTerm = `%${query}%`;
    
    return await db.select()
                    .from(Routes)
                    .where(
                        and(
                            eq(Routes.cooperativeId, cooperativeId),
                            or(
                                ilike(Routes.routeName, searchTerm),
                                ilike(Routes.origin, searchTerm),
                                ilike(Routes.destination, searchTerm),
                                ilike(Routes.routeCode, searchTerm)
                            )
                        )
                    )
                    .limit(limit)
                    .offset(offset)
}

// Query to fetch routes by distance
export async function getRoutesByDistance(
    cooperativeId: string,
    distance: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Routes)
                    .where(
                        and(
                            eq(Routes.cooperativeId, cooperativeId),
                            eq(Routes.distance, distance)
                        )
                    )
                    .limit(limit)
                    .offset(offset)
}

// Query to fetch routes by status
export async function getRoutesByStatus(
    cooperativeId: string,
    status: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Routes)
                    .where(
                        and(
                            eq(Routes.cooperativeId, cooperativeId),
                            eq(Routes.status, status)
                        )
                    )
                    .limit(limit)
                    .offset(offset)
}

// Query to fetch routes by code
export async function getRoutesByCode(
    cooperativeId: string,
    routeCode: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Routes)
                    .where(
                        and(
                            eq(Routes.cooperativeId, cooperativeId),
                            eq(Routes.routeCode, routeCode)
                        )
                    )
                    .limit(limit)
                    .offset(offset)
}

// Query to update route data
export async function updateRoute(
    cooperativeId: string,
    routeId: string,
    route: UpdateRouteDTO
) {
    return await db.update(Routes)
                    .set(route)
                    .where(
                        and(
                            eq(Routes.routeId, routeId),
                            eq(Routes.cooperativeId, cooperativeId)
                        )
                    )
                    .returning()
}

// Query to delete route
export async function deleteRoute(
    cooperativeId: string,
    routeId: string
) {
    return await db.delete(Routes)
                    .where(
                        and(
                            eq(Routes.routeId, routeId),
                            eq(Routes.cooperativeId, cooperativeId)
                        )
                    )
}
