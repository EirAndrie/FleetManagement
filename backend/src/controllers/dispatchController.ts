import { Request, Response } from "express";
import {
    createDispatchService,
    fetchAllDispatchesService,
    fetchDispatchByIdService,
    fetchDispatchesByStatusService,
    fetchDispatchesByRouteIdService,
    fetchDispatchesByDriverIdService,
    fetchDispatchesByVehicleIdService,
    fetchDispatchesByUserIdService,
    fetchDispatchesByDateService,
    updateDispatchService,
    deleteDispatchService
} from "../service/dispatchService";
import logger from "../utils/logger";
import { CreateDispatchDTO, UpdateDispatchDTO } from "../db/dto/dispatchDTO";

// Controller function to create new dispatch
export async function createDispatch(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const dispatch: CreateDispatchDTO = {
            ...req.body,
            dispatchDate: new Date(req.body.dispatchDate),
            dispatchTime: new Date(req.body.dispatchTime),
            endTime: req.body.endTime ? new Date(req.body.endTime) : undefined
        };

        const dispatches = await createDispatchService(dispatch, cooperativeId);
        logger.info(`Dispatch created successfully`);
        res.status(201).json({
            success: true,
            message: "Dispatch created successfully",
            dispatches
        });
    } catch (error: any) {
        logger.error("Failed to create dispatch");
        res.status(400).json({
            success: false,
            message: `Create Dispatch Controller: ${error.message}`
        });
    }
}

// Controller function to fetch all dispatches in a cooperative
export async function getDispatches(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const dispatches = await fetchAllDispatchesService(cooperativeId, page, limit);
        logger.info("Dispatches fetched successfully");
        res.status(200).json({
            success: true,
            message: "Dispatches fetched successfully",
            dispatches
        });
    } catch (error: any) {
        logger.error("Failed to fetch dispatches");
        res.status(400).json({
            success: false,
            message: `Get Dispatches Controller: ${error.message}`
        });
    }
}

// Controller function to fetch dispatch by ID
export async function getDispatchById(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const dispatchId = String(req.params.id);

        const dispatch = await fetchDispatchByIdService(cooperativeId, dispatchId);
        logger.info("Dispatch fetched successfully");
        res.status(200).json({
            success: true,
            message: `Dispatch: ${dispatchId} fetched successfully`,
            dispatch
        });
    } catch (error: any) {
        logger.error("Failed to fetch dispatch");
        res.status(400).json({
            success: false,
            message: `Get Dispatch by ID Controller: ${error.message}`
        });
    }
}

// Controller function to fetch dispatches by status
export async function getDispatchesByStatus(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const status = String(req.query.status) || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const dispatches = await fetchDispatchesByStatusService(cooperativeId, status, page, limit);
        logger.info(`Dispatches with status: ${status} fetched successfully`);
        res.status(200).json({
            success: true,
            message: `Dispatches with status: ${status} fetched successfully`,
            dispatches
        });
    } catch (error: any) {
        logger.error("Failed to fetch dispatches by status");
        res.status(400).json({
            success: false,
            message: `Get Dispatches by Status Controller: ${error.message}`
        });
    }
}

// Controller function to fetch dispatches by route ID
export async function getDispatchesByRoute(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const routeId = String(req.params.id);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const dispatches = await fetchDispatchesByRouteIdService(cooperativeId, routeId, page, limit);
        logger.info(`Dispatches for route: ${routeId} fetched successfully`);
        res.status(200).json({
            success: true,
            message: `Dispatches for route: ${routeId} fetched successfully`,
            dispatches
        });
    } catch (error: any) {
        logger.error("Failed to fetch dispatches by route");
        res.status(400).json({
            success: false,
            message: `Get Dispatches by Route Controller: ${error.message}`
        });
    }
}

// Controller function to fetch dispatches by driver ID
export async function getDispatchesByDriver(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const driverId = String(req.params.id);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const dispatches = await fetchDispatchesByDriverIdService(cooperativeId, driverId, page, limit);
        logger.info(`Dispatches for driver: ${driverId} fetched successfully`);
        res.status(200).json({
            success: true,
            message: `Dispatches for driver: ${driverId} fetched successfully`,
            dispatches
        });
    } catch (error: any) {
        logger.error("Failed to fetch dispatches by driver");
        res.status(400).json({
            success: false,
            message: `Get Dispatches by Driver Controller: ${error.message}`
        });
    }
}

// Controller function to fetch dispatches by vehicle ID
export async function getDispatchesByVehicle(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const vehicleId = String(req.params.id);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const dispatches = await fetchDispatchesByVehicleIdService(cooperativeId, vehicleId, page, limit);
        logger.info(`Dispatches for vehicle: ${vehicleId} fetched successfully`);
        res.status(200).json({
            success: true,
            message: `Dispatches for vehicle: ${vehicleId} fetched successfully`,
            dispatches
        });
    } catch (error: any) {
        logger.error("Failed to fetch dispatches by vehicle");
        res.status(400).json({
            success: false,
            message: `Get Dispatches by Vehicle Controller: ${error.message}`
        });
    }
}

// Controller function to fetch dispatches by user ID
export async function getDispatchesByUser(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const userId = String(req.params.id);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const dispatches = await fetchDispatchesByUserIdService(cooperativeId, userId, page, limit);
        logger.info(`Dispatches created by user: ${userId} fetched successfully`);
        res.status(200).json({
            success: true,
            message: `Dispatches created by user: ${userId} fetched successfully`,
            dispatches
        });
    } catch (error: any) {
        logger.error("Failed to fetch dispatches by user");
        res.status(400).json({
            success: false,
            message: `Get Dispatches by User Controller: ${error.message}`
        });
    }
}

// Controller function to fetch dispatches by date
export async function getDispatchesByDate(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const date = String(req.query.date) || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const dispatches = await fetchDispatchesByDateService(cooperativeId, date, page, limit);
        logger.info(`Dispatches for date: ${date} fetched successfully`);
        res.status(200).json({
            success: true,
            message: `Dispatches for date: ${date} fetched successfully`,
            dispatches
        });
    } catch (error: any) {
        logger.error("Failed to fetch dispatches by date");
        res.status(400).json({
            success: false,
            message: `Get Dispatches by Date Controller: ${error.message}`
        });
    }
}

// Controller function to update dispatch
export async function updateDispatch(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const dispatchId = String(req.params.id);
        const data: UpdateDispatchDTO = {
            ...req.body,
            dispatchDate: req.body.dispatchDate ? new Date(req.body.dispatchDate) : undefined,
            dispatchTime: req.body.dispatchTime ? new Date(req.body.dispatchTime) : undefined,
            endTime: req.body.endTime ? new Date(req.body.endTime) : undefined
        };

        const dispatch = await updateDispatchService(cooperativeId, dispatchId, data);
        logger.info(`Dispatch: ${dispatchId} updated successfully`);
        res.status(200).json({
            success: true,
            message: `Dispatch: ${dispatchId} updated successfully`,
            dispatch
        });
    } catch (error: any) {
        logger.error("Failed to update dispatch");
        res.status(400).json({
            success: false,
            message: `Update Dispatch Controller: ${error.message}`
        });
    }
}

// Controller function to delete dispatch
export async function deleteDispatch(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const dispatchId = String(req.params.id);

        const dispatch = await deleteDispatchService(cooperativeId, dispatchId);
        logger.info(`Dispatch: ${dispatchId} deleted successfully`);
        res.status(200).json({
            success: true,
            message: `Dispatch: ${dispatchId} deleted successfully`,
            dispatch
        });
    } catch (error: any) {
        logger.error("Failed to delete dispatch");
        res.status(400).json({
            success: false,
            message: `Delete Dispatch Controller: ${error.message}`
        });
    }
}
