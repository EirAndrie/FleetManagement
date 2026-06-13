import {eq, ilike, and, or, Update} from "drizzle-orm";

import { db } from "../../config/connectDB";
import { Drivers } from "../schemas/Driver";
import { NewDrivers } from "../schemas/Driver";
import { UpdateDriverDTO } from "../dto/driverDTO";

// Query to insert new driver to the database
export async function insertDriver(
    cooperativeId: string,
    driver: NewDrivers
) {
    const driverWithCoop = { ...driver, cooperativeId } as NewDrivers & { cooperativeId: string };
    return await db.insert(Drivers)
                    .values(driverWithCoop)
                    .returning();
}

// Query to get all drivers in a cooperative
export async function getDrivers(
    cooperativeId: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Drivers)
                    .where(eq(Drivers.cooperativeId, cooperativeId))
                    .limit(limit)
                    .offset(offset)
}

// Query to fetch driver by its ID
export async function getDriverById(
    cooperativeId: string,
    driverId: string
) {
    return await db.select()
                    .from(Drivers)
                    .where(
                        and(
                            eq(Drivers.cooperativeId, cooperativeId),
                            eq(Drivers.driverId, driverId)
                        )
                    )
}

// Query to fetch driver by search keywords
export async function getDriverBySearch(
    cooperativeId: string,
    query: string,
    limit: number,
    offset: number
) {
    const searchTerm = `%${query}%`;
    
    return await db.select()
                    .from(Drivers)
                    .where(
                        and(
                            eq(Drivers.cooperativeId, cooperativeId),
                            ilike(Drivers.firstName, searchTerm),
                            ilike(Drivers.lastName, searchTerm),
                            ilike(Drivers.licenseNumber, searchTerm),
                            ilike(Drivers.phoneNumber, searchTerm)
                        )
                    )
                    .limit(limit)
                    .offset(offset)
}

// Query to fetch drivers by status
export async function getDriversByStatus(
    cooperativeId: string,
    status: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Drivers)
                    .where(
                        and(
                            eq(Drivers.cooperativeId, cooperativeId),
                            eq(Drivers.status, status)
                        )
                    )
                    .limit(limit)
                    .offset(offset)
}

// Query to update driver data
export async function updateDriver(
    cooperativeId: string,
    driverId: string,
    driver: UpdateDriverDTO
) {
    return await db.update(Drivers)
                    .set(driver)
                    .where(
                        and(
                            eq(Drivers.driverId, driverId),
                            eq(Drivers.cooperativeId, cooperativeId)
                        )
                    )
                    .returning()
}

// Query to delete driver
export async function deleteDriver(
    cooperativeId: string,
    driverId: string
) {
    return await db.delete(Drivers)
                    .where(
                        and(
                            eq(Drivers.cooperativeId, cooperativeId),
                            eq(Drivers.driverId, driverId)
                        )
                    )
}