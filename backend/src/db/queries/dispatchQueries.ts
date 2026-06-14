import { eq, and, gte, lt } from "drizzle-orm";

import { db } from "../../config/connectDB";
import { Dispatches } from "../schemas/Dispatch";
import { NewDispatches } from "../schemas/Dispatch";
import { UpdateDispatchDTO } from "../dto/dispatchDTO";

// Query to insert new dispatch to the database
export async function insertDispatch(
    dispatch: NewDispatches
) {
    return await db.insert(Dispatches)
                    .values(dispatch)
                    .returning();
}

// Query to get all dispatches in a cooperative
export async function getDispatches(
    cooperativeId: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Dispatches)
                    .where(eq(Dispatches.cooperativeId, cooperativeId))
                    .limit(limit)
                    .offset(offset)
}

// Query to fetch dispatch by its ID
export async function getDispatchById(
    cooperativeId: string,
    dispatchId: string
) {
    return await db.select()
                    .from(Dispatches)
                    .where(
                        and(
                            eq(Dispatches.cooperativeId, cooperativeId),
                            eq(Dispatches.dispatchId, dispatchId)
                        )
                    )
}

// Query to fetch dispatches by status
export async function getDispatchesByStatus(
    cooperativeId: string,
    status: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Dispatches)
                    .where(
                        and(
                            eq(Dispatches.cooperativeId, cooperativeId),
                            eq(Dispatches.status, status)
                        )
                    )
                    .limit(limit)
                    .offset(offset)
}

// Query to fetch dispatches by route ID
export async function getDispatchesByRouteId(
    cooperativeId: string,
    routeId: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Dispatches)
                    .where(
                        and(
                            eq(Dispatches.cooperativeId, cooperativeId),
                            eq(Dispatches.routeId, routeId)
                        )
                    )
                    .limit(limit)
                    .offset(offset)
}

// Query to fetch dispatches by driver ID
export async function getDispatchesByDriverId(
    cooperativeId: string,
    driverId: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Dispatches)
                    .where(
                        and(
                            eq(Dispatches.cooperativeId, cooperativeId),
                            eq(Dispatches.driverId, driverId)
                        )
                    )
                    .limit(limit)
                    .offset(offset)
}

// Query to fetch dispatches by vehicle ID
export async function getDispatchesByVehicleId(
    cooperativeId: string,
    vehicleId: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Dispatches)
                    .where(
                        and(
                            eq(Dispatches.cooperativeId, cooperativeId),
                            eq(Dispatches.vehicleId, vehicleId)
                        )
                    )
                    .limit(limit)
                    .offset(offset)
}

// Query to fetch dispatches by created by user ID
export async function getDispatchesByUserId(
    cooperativeId: string,
    userId: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Dispatches)
                    .where(
                        and(
                            eq(Dispatches.cooperativeId, cooperativeId),
                            eq(Dispatches.createdBy, userId)
                        )
                    )
                    .limit(limit)
                    .offset(offset)
}

// Query to fetch dispatches by dispatch date
export async function getDispatchesByDate(
    cooperativeId: string,
    startOfDay: Date,
    endOfDay: Date,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Dispatches)
                    .where(
                        and(
                            eq(Dispatches.cooperativeId, cooperativeId),
                            gte(Dispatches.dispatchDate, startOfDay),
                            lt(Dispatches.dispatchDate, endOfDay)
                        )
                    )
                    .limit(limit)
                    .offset(offset)
}

// Query to update dispatch data
export async function updateDispatch(
    cooperativeId: string,
    dispatchId: string,
    dispatch: UpdateDispatchDTO
) {
    return await db.update(Dispatches)
                    .set(dispatch)
                    .where(
                        and(
                            eq(Dispatches.dispatchId, dispatchId),
                            eq(Dispatches.cooperativeId, cooperativeId)
                        )
                    )
                    .returning()
}

// Query to delete dispatch
export async function deleteDispatch(
    cooperativeId: string,
    dispatchId: string
) {
    return await db.delete(Dispatches)
                    .where(
                        and(
                            eq(Dispatches.dispatchId, dispatchId),
                            eq(Dispatches.cooperativeId, cooperativeId)
                        )
                    )
}
