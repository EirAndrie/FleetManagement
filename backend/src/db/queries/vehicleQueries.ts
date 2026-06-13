import {eq, ilike, and, or, Update} from "drizzle-orm";

import { db } from "../../config/connectDB";
import { Vehicles } from "../schemas/Vehicle";
import { NewVehicles } from "../schemas/Vehicle";
import { UpdateVehicleDTO } from "../dto/vehicleDTO";

// Query to insert new vehicle to the database
export async function insertVehicle(data: NewVehicles) {
    return await db.insert(Vehicles)
                    .values(data)
                    .returning();
}

// Query to fetch all vehicles in a cooperative
export async function getVehicles(
    cooperativeId: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Vehicles)
                    .where(eq(Vehicles.cooperativeId, cooperativeId))
                    .limit(limit)
                    .offset(offset);
}

// Query to fetch vehicle by its ID
export async function getVehicleById(cooperativeId: string, vehicleId: string) {
    const vehicle = await db.select()
                    .from(Vehicles)
                    .where(
                        and(
                            eq(Vehicles.cooperativeId, cooperativeId),
                            eq(Vehicles.vehicleId, vehicleId)
                        )
                    );
    return vehicle[0];
}

// Query to fetch vehicles by key words
export async function getVehicleBySearch(
    cooperativeId: string, 
    query: string,
    limit: number,
    offset: number
) {
    if (!query) return [];

    // Format search term to sql like value
    const searchTerm = `%${query}%`;
    return await db.select()
                    .from(Vehicles)
                    .where(
                        and(
                            eq(Vehicles.cooperativeId, cooperativeId),
                            or(
                                ilike(Vehicles.plateNumber, searchTerm),
                                ilike(Vehicles.unitNumber, searchTerm),
                                ilike(Vehicles.make, searchTerm),
                                ilike(Vehicles.model, searchTerm),
                            )
                        )
                    )
                    .limit(limit)
                    .offset(offset);
}

// Query to fetch vehicle by filter make, model, year
export async function getVehicleByFilter(
    cooperativeId: string,
    make: string,
    model: string,
    year: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Vehicles)
                    .where(
                        and(
                            eq(Vehicles.cooperativeId, cooperativeId),
                            or(
                                ilike(Vehicles.make, make),
                                ilike(Vehicles.model, model),
                                ilike(Vehicles.year, year)
                            )
                        )
                    )
                    .limit(limit)
                    .offset(offset);
}

// Query to fetch vehicle by status
export async function getVehicleByStatus(
    cooperativeId: string, 
    status: string,
    limit: number,
    offset: number
) {
    return await db.select()
                    .from(Vehicles)
                    .where(
                        and(
                            eq(Vehicles.cooperativeId, cooperativeId),
                            eq(Vehicles.status, status)
                        )
                    )
                    .limit(limit)
                    .offset(offset);
}

// Query to update vehilce data
export async function updateVehicleData(
    vehicle: UpdateVehicleDTO,
    vehicleId: string,
    cooperativeId: string
) {
    return await db.update(Vehicles)
                    .set(vehicle)
                    .where(
                        and(
                            eq(Vehicles.vehicleId, vehicleId),
                            eq(Vehicles.cooperativeId, cooperativeId)
                        )
                    )
}

// Query to delete vehicle
export async function deleteVehicle(vehicleId: string, cooperativeId: string) {
    return await db.delete(Vehicles)
                    .where(
                        and(
                            eq(Vehicles.vehicleId, vehicleId),
                            eq(Vehicles.cooperativeId, cooperativeId)
                        )
                    )
}