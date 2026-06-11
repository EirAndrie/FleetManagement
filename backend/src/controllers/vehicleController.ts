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

        const vehicles = await fetchAllVehiclesService(cooperativeId);
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
            message: "Failed to fetch all vehicles"
        })
    }
}

// Controller function to fetch vehicle by id
export async function getVehicleById(req: Request, res: Response) {
    try {
        const vehicleId = String(req.params.vehicleId);
        const cooperativeId = String(req.params.cooperativeId);

        const vehicle = await fetchVehicleByIdService(vehicleId, cooperativeId);
        logger.info("Vehicle fetched successfully")
        res.status(200).json({
            success: true,
            message: `Vehicle: ${vehicle.vehicleId} fetched successfully`,
            vehicle
        })
    } catch (error:any) {
        logger.error("Failed to fetch vehicle");
        res.status(400).json({
            success: false,
            message: "Failed to fetch vehicle"
        })
    }
}   