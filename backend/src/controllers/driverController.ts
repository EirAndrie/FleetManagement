import { Request, Response } from "express";
import {
    createDriverService,
    fetchAllDriversService,
    fetchDriverByIdService,
    fetchDriverBySearchService,
    fetchDriverByStatusService,
    updateDriverService,
    deleteDriverService
} from "../service/driverService";
import logger from "../utils/logger";
import { CreateDriverDTO, UpdateDriverDTO } from "../db/dto/driverDTO";

// Controller function to create new driver
export async function createDriver(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const driver: CreateDriverDTO = req.body;

        const drivers = await createDriverService(driver, cooperativeId);
        logger.info(`Driver: ${driver.firstName} Created Successfully`);
        res.status(201).json({
            success: true,
            message: `Driver: ${driver.firstName} Created Successfully`,
            drivers
        })
    } catch (error:any) {
        logger.error("Failed to create driver");
        res.status(400).json({
            success: false,
            message: `Create Driver Controller: ${error.message}`
        })
    }
}

// Controller function to fetch all drivers in a cooperative
export async function getDrivers(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const drivers = await fetchAllDriversService(
            cooperativeId, page, limit
        );
        logger.info("Drivers fetched successfully");
        res.status(200).json({
            success: true,
            message: "Drivers fetched successfully",
            drivers
        })
    } catch (error:any) {
        logger.error("Failed to fetch drivers")
        res.status(400).json({
            success: false,
            message: `Get Drivers Controller: ${error.message}`
        })
    }
}

// Controller function to fetch driver by ID
export async function getDriverById(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const driverId = String(req.params.driverId);

        const driver = await fetchDriverByIdService(
            cooperativeId, driverId
        );
        logger.info("Driver fetched successfully")
        res.status(200).json({
            success: true,
            message: `Driver: ${driverId} fetched successfully`,
            driver
        })
    } catch (error:any) {
        logger.error("Failed to fetch driver");
        res.status(400).json({
            success: false,
            message: `Get Driver by ID Controller: ${error.message}`
        })
    }
}

// Controller function to fetch driver by search
export async function getDriverBySearch(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const query = String(req.query.search) || "";
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const driver = await fetchDriverBySearchService(
            cooperativeId, query, page, limit
        );
        logger.info(`Drivers matching query: ${query} fetched successfully`);
        res.status(200).json({
            success: true,
            message: `Drivers matching query: ${query} fetched successfully`,
            driver
        })
    } catch (error:any) {
        logger.error("Failed to fetch drivers by search");
        res.status(400).json({
            success: false,
            message: `Get Driver by Search Controller: ${error.message}`
        })
    }
}

// Controller function to fetch drivers by status
export async function getDriverByStatus(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const status = String(req.query.status) || "";
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const driver = await fetchDriverByStatusService(
            cooperativeId, status, page, limit
        );
        logger.info(`Drivers with status: ${status} fetched successfully`);
        res.status(200).json({
            success: true,
            message: `Drivers with status: ${status} fetched successfully`,
            driver
        })
    } catch (error:any) {
        logger.error("Failed to fetch drivers by status");
        res.status(400).json({
            success: false,
            message: `Get Driver by Status Controller: ${error.message}`
        })
    }
}

// Controller function to update driver
export async function updateDriver(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const driverId = String(req.params.driverId);
        const data: UpdateDriverDTO = req.body;

        const driver = await updateDriverService(
            cooperativeId, driverId, data
        );
        logger.info(`Driver: ${driverId} updated successfully`);
        res.status(200).json({
            success: true,
            message: `Driver: ${driverId} updated successfully`,
            driver
        })
    } catch (error:any) {
        logger.error("Failed to update driver");
        res.status(400).json({
            success: false,
            message: `Update Driver Controller: ${error.message}`
        })
    }
}

// Controller function to delete driver
export async function deleteDriver(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const driverId = String(req.params.driverId);

        const driver = await deleteDriverService(
            cooperativeId, driverId
        );
        logger.info(`Driver: ${driverId} deleted successfully`);
        res.status(200).json({
            success: true,
            message: `Driver: ${driverId} deleted successfully`,
            driver
        })
    } catch (error:any) {
        logger.error("Failed to delete driver");
        res.status(400).json({
            success: false,
            message: `Delete Driver Controller: ${error.message}`
        })
    }
}