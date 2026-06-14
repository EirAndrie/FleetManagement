import {
    insertDriver,
    getDrivers,
    getDriverById,
    getDriverBySearch,
    getDriversByStatus,
    updateDriver,
    deleteDriver
} from "../db/queries/driverQueries";
import logger from "../utils/logger";
import { NewDrivers } from "../db";
import { CreateDriverDTO, UpdateDriverDTO } from "../db/dto/driverDTO";
import { Pagination } from "../utils/pagination";



// Function to create new driver
export async function createDriverService(
    dto: CreateDriverDTO,
    cooperativeId: string
) {
    // Validation layer
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    if (!dto.firstName) {
        logger.info("Driver first name is required")
        console.warn("Driver first name is required")
    }

    if (!dto.lastName) {
        logger.info("Driver last name is required")
        console.warn("Driver last name is required")
    }

    if (!dto.phoneNumber) {
        logger.info("Driver phone number is required")
        console.warn("Driver phone number is required")
    }

    if (!dto.licenseNumber) {
        logger.info("Driver license number is required")
        console.warn("Driver license number is required")
    }

    if (!dto.licenseExpiry) {
        logger.info("License expiry is required")
        console.warn("License expiry is required")
    }

    if (!dto.status) {
        logger.info("Driver status is required")
        console.warn("Driver status is required")
    }

    // Driver payload
    const driverData: NewDrivers = {
        cooperativeId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        middleName: dto.middleName,
        phoneNumber: dto.phoneNumber,
        licenseNumber: dto.licenseNumber,
        licenseExpiry: dto.licenseExpiry,
        status: dto.status
    }

    return await insertDriver(driverData)
}



// Function to fetch all drivers in a cooperative
export async function fetchAllDriversService(
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

    const drivers = await getDrivers(
        cooperativeId, pageSize, offset
    )

    if (drivers.length === 0) {
        logger.info("No drivers found")
        console.warn("No drivers found")
    } 

    return drivers;
}



// Function to fetch driver by ID
export async function fetchDriverByIdService(
    cooperativeId: string,
    driverId: string
) {
    if (!cooperativeId || !driverId) {
        throw new Error("Missing required IDs");
    }
    
    const driver = await getDriverById(cooperativeId, driverId);

    if (!driver) {
        logger.info(`Driver: ${driverId} not found`);
        console.warn(`Driver: ${driverId} not found`)
    }

    return driver
}



// Function to fetch driver by search
export async function fetchDriverBySearchService(
    cooperativeId: string,
    query: string,
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

    const driver = await getDriverBySearch(
        cooperativeId, query, pageSize, offset
    )

    if (!driver) {
        logger.info(`Driver ${query} not found`)
        console.warn(`Driver ${query} not found`)
    }

    return driver;
}



// Function to fetch driver by status
export async function fetchDriverByStatusService(
    cooperativeId: string,
    status: string,
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

    const driver = await getDriversByStatus(
        cooperativeId, status, pageSize, offset
    )

    if (!driver) {
        logger.info("Drivers not found")
        console.warn("Drivers not found")
    }

    return driver;
}



// Function to update driver
export async function updateDriverService(
    cooperativeId: string,
    driverId: string,
    data: UpdateDriverDTO
) {
    if (!cooperativeId || !driverId) {
        throw new Error("Missing required IDs");
    }

    const driver = await updateDriver(
        cooperativeId, driverId, data
    )

    if (!driver) {
        logger.info(`Driver: ${driverId} not found`);
        console.warn(`Driver: ${driverId} not found`)
    }

    return driver;
}



// Function to delete driver
export async function deleteDriverService(
    cooperativeId: string,
    driverId: string,
) {
    if (!cooperativeId || !driverId) {
        throw new Error("Missing required IDs");
    }

    const driver = await deleteDriver(
        cooperativeId, driverId
    )

    if (!driver) {
        logger.info(`Driver to delete: ${driverId} not found`)
        console.warn(`Driver to delete: ${driverId} not found`)
    }

    return driver;
}