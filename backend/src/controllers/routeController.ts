import { Request, Response } from "express";
import {
    createRouteService,
    fetchAllRoutesService,
    fetchRouteByIdService,
    fetchRouteBySearchService,
    fetchRoutesByDistanceService,
    fetchRoutesByStatusService,
    fetchRoutesByCodeService,
    updateRouteService,
    deleteRouteService
} from "../service/routeService";
import logger from "../utils/logger";
import { CreateRouteDTO, UpdateRouteDTO } from "../db/dto/routeDTO";

// Controller function to create new route
export async function createRoute(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const route: CreateRouteDTO = req.body;

        const routes = await createRouteService(route, cooperativeId);
        logger.info(`Route: ${route.routeCode} Created Successfully`);
        res.status(201).json({
            success: true,
            message: `Route: ${route.routeCode} Created Successfully`,
            routes
        })
    } catch (error: any) {
        logger.error("Failed to create route");
        res.status(400).json({
            success: false,
            message: `Create Route Controller: ${error.message}`
        })
    }
}

// Controller function to fetch all routes
export async function getRoutes(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const routes = await fetchAllRoutesService(cooperativeId, page, limit);
        logger.info("Routes fetched successfully");
        res.status(200).json({
            success: true,
            message: "Routes fetched successfully",
            routes
        })
    } catch (error: any) {
        logger.error("Failed to fetch routes")
        res.status(400).json({
            success: false,
            message: `Get Routes Controller: ${error.message}`
        })
    }
}

// Controller function to fetch route by ID
export async function getRouteById(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const routeId = String(req.params.id);

        const route = await fetchRouteByIdService(cooperativeId, routeId);
        logger.info("Route fetched successfully")
        res.status(200).json({
            success: true,
            message: `Route: ${routeId} fetched successfully`,
            route
        })
    } catch (error: any) {
        logger.error("Failed to fetch route");
        res.status(400).json({
            success: false,
            message: `Get Route by ID Controller: ${error.message}`
        })
    }
}

// Controller function to fetch route by search
export async function getRouteBySearch(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const query = String(req.query.search) || "";
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const route = await fetchRouteBySearchService(cooperativeId, query, page, limit);
        logger.info(`Routes matching query: ${query} fetched successfully`);
        res.status(200).json({
            success: true,
            message: `Routes matching query: ${query} fetched successfully`,
            route
        })
    } catch (error: any) {
        logger.error("Failed to fetch routes by search");
        res.status(400).json({
            success: false,
            message: `Get Route by Search Controller: ${error.message}`
        })
    }
}

// Controller function to fetch routes by distance
export async function getRoutesByDistance(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const distance = String(req.query.distance) || "";
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const routes = await fetchRoutesByDistanceService(cooperativeId, distance, page, limit);
        logger.info(`Routes with distance: ${distance} fetched successfully`);
        res.status(200).json({
            success: true,
            message: `Routes with distance: ${distance} fetched successfully`,
            routes
        })
    } catch (error: any) {
        logger.error("Failed to fetch routes by distance");
        res.status(400).json({
            success: false,
            message: `Get Routes by Distance Controller: ${error.message}`
        })
    }
}

// Controller function to fetch routes by status
export async function getRoutesByStatus(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const status = String(req.query.status) || "";
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const routes = await fetchRoutesByStatusService(cooperativeId, status, page, limit);
        logger.info(`Routes with status: ${status} fetched successfully`);
        res.status(200).json({
            success: true,
            message: `Routes with status: ${status} fetched successfully`,
            routes
        })
    } catch (error: any) {
        logger.error("Failed to fetch routes by status");
        res.status(400).json({
            success: false,
            message: `Get Routes by Status Controller: ${error.message}`
        })
    }
}

// Controller function to fetch routes by code
export async function getRoutesByCode(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const routeCode = String(req.query.code) || "";
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const routes = await fetchRoutesByCodeService(cooperativeId, routeCode, page, limit);
        logger.info(`Routes with code: ${routeCode} fetched successfully`);
        res.status(200).json({
            success: true,
            message: `Routes with code: ${routeCode} fetched successfully`,
            routes
        })
    } catch (error: any) {
        logger.error("Failed to fetch routes by code");
        res.status(400).json({
            success: false,
            message: `Get Routes by Code Controller: ${error.message}`
        })
    }
}

// Controller function to update route
export async function updateRoute(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const routeId = String(req.params.id);
        const data: UpdateRouteDTO = req.body;

        const route = await updateRouteService(cooperativeId, routeId, data);
        logger.info(`Route: ${routeId} updated successfully`);
        res.status(200).json({
            success: true,
            message: `Route: ${routeId} updated successfully`,
            route
        })
    } catch (error: any) {
        logger.error("Failed to update route");
        res.status(400).json({
            success: false,
            message: `Update Route Controller: ${error.message}`
        })
    }
}

// Controller function to delete route
export async function deleteRoute(req: Request, res: Response) {
    try {
        const cooperativeId = String(req.params.cooperativeId);
        const routeId = String(req.params.id);

        const route = await deleteRouteService(cooperativeId, routeId);
        logger.info(`Route: ${routeId} deleted successfully`);
        res.status(200).json({
            success: true,
            message: `Route: ${routeId} deleted successfully`,
            route
        })
    } catch (error: any) {
        logger.error("Failed to delete route");
        res.status(400).json({
            success: false,
            message: `Delete Route Controller: ${error.message}`
        })
    }
}
