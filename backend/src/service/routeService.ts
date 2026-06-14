import {
    insertRoute,
    getRoutes,
    getRouteById,
    getRouteBySearch,
    getRoutesByDistance,
    getRoutesByStatus,
    getRoutesByCode,
    updateRoute,
    deleteRoute
} from "../db/queries/routeQueries";
import logger from "../utils/logger";
import { NewRoutes } from "../db";
import { CreateRouteDTO, UpdateRouteDTO } from "../db/dto/routeDTO";
import { Pagination } from "../utils/pagination";



// Function to create new route
export async function createRouteService(
    dto: CreateRouteDTO,
    cooperativeId: string
) {
    // Validation layer
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    if (!dto.routeName) {
        logger.info("Route name is required")
        console.warn("Route name is required")
    }

    if (!dto.routeCode) {
        logger.info("Route code is required")
        console.warn("Route code is required")
    }

    if (!dto.origin) {
        logger.info("Route origin is required")
        console.warn("Route origin is required")
    }

    if (!dto.destination) {
        logger.info("Route destination is required")
        console.warn("Route destination is required")
    }

    if (!dto.distance) {
        logger.info("Route distance is required")
        console.warn("Route distance is required")
    }

    if (!dto.status) {
        logger.info("Route status is required")
        console.warn("Route status is required")
    }

    // Route payload
    const routeData: NewRoutes = {
        cooperativeId,
        routeName: dto.routeName,
        routeCode: dto.routeCode,
        origin: dto.origin,
        destination: dto.destination,
        distance: dto.distance,
        status: dto.status
    }

    return await insertRoute(routeData)
}



// Function to fetch all routes
export async function fetchAllRoutesService(
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

    const routes = await getRoutes(cooperativeId, pageSize, offset)

    if (routes.length === 0) {
        logger.info("No routes found")
        console.warn("No routes found")
    }

    return routes;
}



// Function to fetch route by ID
export async function fetchRouteByIdService(
    cooperativeId: string,
    routeId: string
) {
    if (!cooperativeId || !routeId) {
        throw new Error("Missing required IDs");
    }
    
    const route = await getRouteById(cooperativeId, routeId);

    if (!route) {
        logger.info(`Route: ${routeId} not found`);
        console.warn(`Route: ${routeId} not found`)
    }

    return route
}



// Function to fetch route by search
export async function fetchRouteBySearchService(
    cooperativeId: string,
    query: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    if (!query) {
        throw new Error("Missing search query")
    }

    // Pagination
    const {
        offset,
        limit: pageSize
    } = await Pagination(page, limit);

    const route = await getRouteBySearch(cooperativeId, query, pageSize, offset)

    if (!route) {
        logger.info(`Route ${query} not found`)
        console.warn(`Route ${query} not found`)
    }

    return route;
}



// Function to fetch routes by distance
export async function fetchRoutesByDistanceService(
    cooperativeId: string,
    distance: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    if (!distance) {
        throw new Error("Missing distance parameter")
    }

    // Pagination
    const {
        offset,
        limit: pageSize
    } = await Pagination(page, limit);

    const routes = await getRoutesByDistance(cooperativeId, distance, pageSize, offset)

    if (!routes) {
        logger.info("Routes not found")
        console.warn("Routes not found")
    }

    return routes;
}



// Function to fetch routes by status
export async function fetchRoutesByStatusService(
    cooperativeId: string,
    status: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    if (!status) {
        throw new Error("Missing status parameter")
    }

    // Pagination
    const {
        offset,
        limit: pageSize
    } = await Pagination(page, limit);

    const routes = await getRoutesByStatus(cooperativeId, status, pageSize, offset)

    if (!routes) {
        logger.info("Routes not found")
        console.warn("Routes not found")
    }

    return routes;
}



// Function to fetch routes by code
export async function fetchRoutesByCodeService(
    cooperativeId: string,
    routeCode: string,
    page: number,
    limit: number
) {
    if (!cooperativeId) {
        throw new Error("Missing cooperative ID")
    }

    if (!routeCode) {
        throw new Error("Missing route code parameter")
    }

    // Pagination
    const {
        offset,
        limit: pageSize
    } = await Pagination(page, limit);

    const routes = await getRoutesByCode(cooperativeId, routeCode, pageSize, offset)

    if (!routes) {
        logger.info("Routes not found")
        console.warn("Routes not found")
    }

    return routes;
}



// Function to update route
export async function updateRouteService(
    cooperativeId: string,
    routeId: string,
    data: UpdateRouteDTO
) {
    if (!cooperativeId || !routeId) {
        throw new Error("Missing required IDs");
    }

    const route = await updateRoute(cooperativeId, routeId, data)

    if (!route) {
        logger.info(`Route: ${routeId} not found`);
        console.warn(`Route: ${routeId} not found`)
    }

    return route;
}



// Function to delete route
export async function deleteRouteService(
    cooperativeId: string,
    routeId: string,
) {
    if (!cooperativeId || !routeId) {
        throw new Error("Missing required IDs");
    }

    const route = await deleteRoute(cooperativeId, routeId)

    if (!route) {
        logger.info(`Route to delete: ${routeId} not found`)
        console.warn(`Route to delete: ${routeId} not found`)
    }

    return route;
}
