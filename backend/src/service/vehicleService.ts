import {
    insertVehicle,
    getVehicles,
    getVehicleById,
    getVehicleBySearch,
    getVehicleByFilter,
    getVehicleByStatus,
    updateVehicleData,
    deleteVehicle
} from "../db/queries/vehicleQueries";
import logger from "../utils/logger";
import { NewVehicles } from "../db";
import { CreateVehicleDTO, UpdateVehicleDTO } from "../db/dto/vehicleDTO";
import { Pagination } from "../utils/pagination";


// Function to create new vehicle
export async function createVehicleService(
    dto: CreateVehicleDTO,
    cooperativeId: string
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    // Validation later (DTO level)
    if (!dto.plateNumber) {
        logger.info("Plate number is required")
        console.warn("Plate number is required")
    }

    if (!dto.unitNumber) {
        logger.info("Unit number is required")
        console.warn("Unit number is required")
    }

    if (!dto.make) {
        logger.info("Vehicle make is required");
        console.warn("Vehicle make is required");
    }

    if (!dto.model) {
        logger.info("Vehicle model is required");
        console.warn("Vehicle model is required");
    }

    if (!dto.year) {
        logger.info("Vehicle year is required");
        console.warn("Vehicle year is required")
    }

    if (!dto.capactiy) {
        logger.info("Vehicle capacity is required");
        console.warn("Vehicle capacity is required");
    }

    if (!dto.type) {
        logger.info("Vehicle type is required");
        console.warn("Vehicle type is required")
    }

    if (!dto.type) {
        logger.info("Vehicle status is required");
        console.warn("Vehicle status is required");
    }

    if (!dto.cooperativeId) {
        logger.warn("Vehicle Cooperative ID not found")
        console.warn("Vehicle Cooperative ID not found")
    }

    // Vehicle payload data
    const vehicleData: NewVehicles = {
        cooperativeId,

        plateNumber: dto.plateNumber,
        unitNumber: dto.unitNumber,
        make: dto.make,
        model: dto.model,
        year: dto.year,
        capacity: dto.capactiy,
        type: dto.type,
        status: dto.status
    }

    return await insertVehicle(vehicleData)
}



// Function to fetch all vehicles in a cooperative
export async function fetchAllVehiclesService(
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


    const vehicles = await getVehicles(
        cooperativeId, pageSize, offset
    );
    if (vehicles.length === 0) {
        logger.info("No vehicles found");
        console.warn("No Vehicles found");
    }

    return vehicles
}



// Function to fetch vehicle by its ID
export async function fetchVehicleByIdService(
    vehicleId: string,
    cooperativeId: string
) {
    if (!vehicleId || cooperativeId) {
        throw new Error("Missing required IDs")
    }

    const vehicle = await getVehicleById(vehicleId, cooperativeId);

    if (!vehicle) {
        logger.info(`Vehicle ${vehicleId} not found`);
        console.warn(`Vehicle ${vehicleId} not found`)
    }

    return vehicle;
}



// Function to fetch vehicle by search
export async function fetchVehicleBySearchService(
    cooperativeId: string,
    searchTerm: string,
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


    const vehicle = await getVehicleBySearch(
        cooperativeId, searchTerm, pageSize, offset
    );
    if (!vehicle) {
        logger.info(`Vehicle ${searchTerm} not found`);
        console.warn(`Vehicle ${searchTerm} not found`);
    }

    return vehicle
}



// Function to fetch vehicle by filter
export async function fetchVehicleByFilterService(
    cooperativeId: string,
    make: string,
    model: string,
    year: string,
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

    const vehicle = await getVehicleByFilter(
        cooperativeId, make, model, year, pageSize, offset
    );
    if (!vehicle) {
        logger.info(`Vehicle: ${make + " " + model + " " + year} not found`);
        console.warn(`Vehicle: ${make + " " + model + " " + year} not found`)
    }

    return vehicle;
}



// Function to fetch vehicle by their status
export async function fetchVehicleByStatusService(
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

    const vehicle = await getVehicleByStatus(
        cooperativeId, status, pageSize, offset
    );

    if (!vehicle) {
        logger.info("Vehicle not found");
        console.warn("Vehicle not found")
    }
}



// Function to update vehicle data
export async function updateVehicleService(
    vehicleData: UpdateVehicleDTO,
    vehicleId: string,
    cooperativeId: string
) {
    if (!cooperativeId || !vehicleId) {
        throw new Error("Missing required IDs")
    }

    const vehicle = await updateVehicleData(vehicleData, vehicleId, cooperativeId);

    if (!vehicle) {
        logger.info("Vehicle not found");
        console.warn("Vehicle not found")
    }
}



// Function to delete vehicle
export async function deleteVehicleService(
    vehicleId: string,
    cooperativeId: string
) {
    if (!cooperativeId || !vehicleId) {
        throw new Error("Missing required IDs")
    }

    const vehicle = await deleteVehicle(vehicleId, cooperativeId);

    if (!vehicle) {
        logger.info("Vehicle to delete not found")
        console.warn("Vehicle to delete not found")
    }

    return vehicle
}