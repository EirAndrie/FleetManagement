import {
    insertCooperative,
    getCooperativeById,
    updateCooperative,
    deleteCooperative
} from "../db/queries/cooperativeQueries";
import logger from "../utils/logger";
import { NewCooperative } from "../db";
import { CreateCooperativeDTO, UpdateCooperativeDTO } from "../db/dto/cooperativeDTO";

// Function to create a cooperative
export async function createCooperativeService(
    dto: CreateCooperativeDTO
) {
    if (!dto.name) {
        logger.info("Cooperative name is required");
        console.warn("Cooperative name is required");
    }

    if (!dto.address) {
        logger.info("Cooperative address is required");
        console.warn("Cooperative address is required");
    }

    if (!dto.contactNumber) {
        logger.info("Cooperative contact number is required");
        console.warn("Cooperative contact number is required");
    }

    const cooperativeData: NewCooperative = {
        name: dto.name,
        description: dto.description,
        address: dto.address,
        contactNumber: dto.contactNumber
    };

    return await insertCooperative(cooperativeData);
}

// Function to fetch cooperative by ID
export async function fetchCooperativeByIdService(
    cooperativeId: string
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID");
    }

    const cooperative = await getCooperativeById(cooperativeId);

    if (!cooperative) {
        logger.info(`Cooperative: ${cooperativeId} not found`);
        console.warn(`Cooperative: ${cooperativeId} not found`);
    }

    return cooperative;
}

// Function to update cooperative
export async function updateCooperativeService(
    cooperativeId: string,
    data: UpdateCooperativeDTO
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID");
    }

    return await updateCooperative(cooperativeId, data);
}

// Function to delete cooperative
export async function deleteCooperativeService(
    cooperativeId: string
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID");
    }

    return await deleteCooperative(cooperativeId);
}
