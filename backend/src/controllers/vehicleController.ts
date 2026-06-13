import { Request, Response } from "express";
import {
    createVehicleService,
    fetchAllVehiclesService,
    fetchVehicleByIdService,
    fetchVehicleBySearchService,
    fetchVehicleByFilterService,
    fetchVehicleByStatusService,
    updateVehicleService,
    deleteVehicleService
} from "../service/vehicleService"
import logger from "../utils/logger";
import { CreateVehicleDTO, UpdateVehicleDTO } from "../db/dto/vehicleDTO";

// Controller function to create vehicle
export async function createVehicle(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const vehicle: CreateVehicleDTO = req.body;

        const vehicles = await createVehicleService(vehicle, cooperativeId);
        logger.info("User Created Successfully");
        res.status(201).json({
            success: true,
            message: "Vehicle Created Successfully",
            vehicles
        })
    } catch(error:any) {
        logger.error("Failed to create vehicle")
        res.status(400).json({
            success: false,
            message: `Create Vehicle Controller: ${error.message}`
        })
    }
}

// Controller function to fetch all vehicles in a cooperative
export async function getAllVehicles(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const vehicles = await fetchAllVehiclesService(cooperativeId, page, limit);
        logger.info("Successfully fetched all vehicles");
        res.status(200).json({
            success: true,
            message: "Successfully fetched all vehicles",
            vehicles
        })
    } catch (error:any) {
        logger.error("Failed to fetch all vehicles")
        res.status(400).json({
            success: false,
            message: `Get All Vehicles Controller ${error.message}`
        })
    }
}

// Controller function to fetch vehicle by id
export async function getVehicleById(req: Request, res: Response) {
    try {
        const vehicleId = String(req.params.vehicleId);
        const cooperativeId = String(req.params.cooperativeId);

        const vehicles = await fetchVehicleByIdService(vehicleId, cooperativeId);
        logger.info("Vehicle fetched successfully")
        res.status(200).json({
            success: true,
            message: `Vehicle: ${vehicles.vehicleId} fetched successfully`,
            vehicles
        })
    } catch (error:any) {
        logger.error("Failed to fetch vehicle");
        res.status(400).json({
            success: false,
            message: `Get Vehicle by ID Controller ${error.message}`
        })
    }
}

// Controller function to fetch vehicle by search terms
export async function getVehicleBySearch(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const searchTerm = String(req.query.search);
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const vehicles = await fetchVehicleBySearchService(
            cooperativeId, searchTerm, page, limit
        )
        logger.info(`Vehicle: ${searchTerm} Fetched Successfully`);
        res.status(200).json({
            success: true,
            message: `Vehicle: ${searchTerm} Fetched successfully`,
            vehicles
        })
    } catch (error:any) {
        logger.error(`Failed to fetch vehicle`);
        res.status(400).json({
            success: false,
            message: `Get Vehicle by Search Controller: ${error.message}`
        });
    }
}

// Controller function to fetch vehicle by filter
export async function getVehicleByFilter(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const make = String(req.query.filter);
        const model = String(req.query.filter);
        const year = String(req.query.filter);
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const vehicles = await fetchVehicleByFilterService(
            cooperativeId, make, model, year, page, limit
        );
        logger.info(`Vehicle: ${make}: ${model}: ${year} Fetched Successfully`);
        res.status(200).json({
            success: true,
            message: `Vehicle: ${make}: ${model}: ${year} Fetched Successfully`,
            vehicles
        });
    } catch (error:any) {
        logger.error("Failed to fetch vehicle");
        res.status(400).json({
            success: false,
            message: `Get Vehicle by Filter Controller ${error.message}`
        })
    }
}

// Controller function to fetch vehicle by status
export async function getVehicleByStatus(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const status = String(req.query.status);
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const vehicles = await fetchVehicleByStatusService(
            cooperativeId, status, page, limit
        );
        logger.info("Vehicle fetched successfully")
        res.status(200).json({
            success: true,
            message: "Vehicle Fetched Successfully",
            vehicles
        })
    } catch (error:any) {
        logger.error("Failed to fetch vehicle");
        res.status(400).json({
            success: false,
            message: `Get Vehicle By Status Controller: ${error.message}`
        })
    }
}

// Controller function to update vehicle data
export async function updateVehicle(req: Request, res: Response) {
    try {
        const updatedVehicle: UpdateVehicleDTO = req.body;
        const vehicleId = String(req.params.vehicleId);
        const cooperativeId = String(req.params.cooperativeId);

        const vehicles = await updateVehicleService(updatedVehicle, vehicleId, cooperativeId);
        logger.info("Vehicle updated successfully");
        res.status(201).json({
            success: true,
            message: "Vehicle updated successfully",
            vehicles
        })
    } catch (error:any) {
        logger.error("Failed to update vehicle");
        res.status(400).json({
            success: false,
            message: `Update Vehicle Cotntroller: ${error.message}`
        });
    }
}

// Controller function to delete vehicle
export async function deleteVehicle(req: Request, res: Response) {
    try {
        const vehicleId = String(req.params.vehicleId);
        const cooperativeId = String(req.params.cooperativeId);

        const vehicles = await deleteVehicleService(vehicleId, cooperativeId);
        logger.info("Vehicle deleted successfully")
        res.status(201).json({
            success: true,
            message: "Vehicle deleted successfully",
            vehicles
        })
    } catch (error:any) {
        logger.error("Failed to delete vehicle");
        res.status(400).json({
            success: false,
            message: `Delete Vehicle COntroller ${error.message}`
        });
    }
}