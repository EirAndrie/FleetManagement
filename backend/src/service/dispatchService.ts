import {
    insertDispatch,
    getDispatches,
    getDispatchById,
    getDispatchesByStatus,
    getDispatchesByRouteId,
    getDispatchesByDriverId,
    getDispatchesByVehicleId,
    getDispatchesByUserId,
    getDispatchesByDate,
    updateDispatch,
    deleteDispatch
} from "../db/queries/dispatchQueries";
import logger from "../utils/logger";
import { NewDispatches } from "../db";
import { CreateDispatchDTO, UpdateDispatchDTO } from "../db/dto/dispatchDTO";
import { Pagination } from "../utils/pagination";

// Function to create new dispatch
export async function createDispatchService(
    dto: CreateDispatchDTO,
    cooperativeId: string
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID");
    }

    if (!dto.dispatchDate) {
        logger.info("Dispatch date is required");
        console.warn("Dispatch date is required");
    }

    if (!dto.dispatchTime) {
        logger.info("Dispatch time is required");
        console.warn("Dispatch time is required");
    }

    if (!dto.status) {
        logger.info("Dispatch status is required");
        console.warn("Dispatch status is required");
    }

    if (!dto.vehicleId) {
        logger.info("Vehicle ID is required");
        console.warn("Vehicle ID is required");
    }

    if (!dto.driverId) {
        logger.info("Driver ID is required");
        console.warn("Driver ID is required");
    }

    if (!dto.routeId) {
        logger.info("Route ID is required");
        console.warn("Route ID is required");
    }

    if (!dto.createdBy) {
        logger.info("Created by user ID is required");
        console.warn("Created by user ID is required");
    }

    const dispatchData: NewDispatches = {
        cooperativeId,
        dispatchDate: new Date(dto.dispatchDate),
        dispatchTime: new Date(dto.dispatchTime),
        endTime: dto.endTime ? new Date(dto.endTime) : undefined,
        status: dto.status,
        vehicleId: dto.vehicleId,
        driverId: dto.driverId,
        routeId: dto.routeId,
        createdBy: dto.createdBy
    };

    return await insertDispatch(dispatchData);
}

// Function to fetch all dispatches in a cooperative
export async function fetchAllDispatchesService(
    cooperativeId: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID");
    }

    const { offset, limit: pageSize } = await Pagination(page, limit);

    const dispatches = await getDispatches(cooperativeId, pageSize, offset);

    if (dispatches.length === 0) {
        logger.info("No dispatches found");
        console.warn("No dispatches found");
    }

    return dispatches;
}

// Function to fetch dispatch by ID
export async function fetchDispatchByIdService(
    cooperativeId: string,
    dispatchId: string
) {
    if (!cooperativeId || !dispatchId) {
        throw new Error("Missing required IDs");
    }

    const dispatch = await getDispatchById(cooperativeId, dispatchId);

    if (!dispatch) {
        logger.info(`Dispatch: ${dispatchId} not found`);
        console.warn(`Dispatch: ${dispatchId} not found`);
    }

    return dispatch;
}

// Function to fetch dispatches by status
export async function fetchDispatchesByStatusService(
    cooperativeId: string,
    status: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID");
    }

    if (!status) {
        throw new Error("Missing status parameter");
    }

    const { offset, limit: pageSize } = await Pagination(page, limit);

    const dispatches = await getDispatchesByStatus(cooperativeId, status, pageSize, offset);

    if (!dispatches) {
        logger.info(`Dispatches with status ${status} not found`);
        console.warn(`Dispatches with status ${status} not found`);
    }

    return dispatches;
}

// Function to fetch dispatches by route ID
export async function fetchDispatchesByRouteIdService(
    cooperativeId: string,
    routeId: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID");
    }

    if (!routeId) {
        throw new Error("Missing route ID");
    }

    const { offset, limit: pageSize } = await Pagination(page, limit);

    const dispatches = await getDispatchesByRouteId(cooperativeId, routeId, pageSize, offset);

    if (!dispatches) {
        logger.info(`Dispatches for route ${routeId} not found`);
        console.warn(`Dispatches for route ${routeId} not found`);
    }

    return dispatches;
}

// Function to fetch dispatches by driver ID
export async function fetchDispatchesByDriverIdService(
    cooperativeId: string,
    driverId: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID");
    }

    if (!driverId) {
        throw new Error("Missing driver ID");
    }

    const { offset, limit: pageSize } = await Pagination(page, limit);

    const dispatches = await getDispatchesByDriverId(cooperativeId, driverId, pageSize, offset);

    if (!dispatches) {
        logger.info(`Dispatches for driver ${driverId} not found`);
        console.warn(`Dispatches for driver ${driverId} not found`);
    }

    return dispatches;
}

// Function to fetch dispatches by vehicle ID
export async function fetchDispatchesByVehicleIdService(
    cooperativeId: string,
    vehicleId: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID");
    }

    if (!vehicleId) {
        throw new Error("Missing vehicle ID");
    }

    const { offset, limit: pageSize } = await Pagination(page, limit);

    const dispatches = await getDispatchesByVehicleId(cooperativeId, vehicleId, pageSize, offset);

    if (!dispatches) {
        logger.info(`Dispatches for vehicle ${vehicleId} not found`);
        console.warn(`Dispatches for vehicle ${vehicleId} not found`);
    }

    return dispatches;
}

// Function to fetch dispatches by user ID
export async function fetchDispatchesByUserIdService(
    cooperativeId: string,
    userId: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID");
    }

    if (!userId) {
        throw new Error("Missing user ID");
    }

    const { offset, limit: pageSize } = await Pagination(page, limit);

    const dispatches = await getDispatchesByUserId(cooperativeId, userId, pageSize, offset);

    if (!dispatches) {
        logger.info(`Dispatches created by user ${userId} not found`);
        console.warn(`Dispatches created by user ${userId} not found`);
    }

    return dispatches;
}

// Function to fetch dispatches by date
export async function fetchDispatchesByDateService(
    cooperativeId: string,
    date: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID");
    }

    if (!date) {
        throw new Error("Missing date parameter");
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date format");
    }

    const startOfDay = new Date(parsedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const { offset, limit: pageSize } = await Pagination(page, limit);

    const dispatches = await getDispatchesByDate(cooperativeId, startOfDay, endOfDay, pageSize, offset);

    if (!dispatches) {
        logger.info(`Dispatches for date ${date} not found`);
        console.warn(`Dispatches for date ${date} not found`);
    }

    return dispatches;
}

// Function to update dispatch
export async function updateDispatchService(
    cooperativeId: string,
    dispatchId: string,
    data: UpdateDispatchDTO
) {
    if (!cooperativeId || !dispatchId) {
        throw new Error("Missing required IDs");
    }

    const updateData: UpdateDispatchDTO = {
        ...data,
        dispatchDate: data.dispatchDate ? new Date(data.dispatchDate) : undefined,
        dispatchTime: data.dispatchTime ? new Date(data.dispatchTime) : undefined,
        endTime: data.endTime ? new Date(data.endTime) : undefined
    };

    const dispatch = await updateDispatch(cooperativeId, dispatchId, updateData);

    if (!dispatch) {
        logger.info(`Dispatch: ${dispatchId} not found`);
        console.warn(`Dispatch: ${dispatchId} not found`);
    }

    return dispatch;
}

// Function to delete dispatch
export async function deleteDispatchService(
    cooperativeId: string,
    dispatchId: string
) {
    if (!cooperativeId || !dispatchId) {
        throw new Error("Missing required IDs");
    }

    const dispatch = await deleteDispatch(cooperativeId, dispatchId);

    if (!dispatch) {
        logger.info(`Dispatch to delete: ${dispatchId} not found`);
        console.warn(`Dispatch to delete: ${dispatchId} not found`);
    }

    return dispatch;
}
