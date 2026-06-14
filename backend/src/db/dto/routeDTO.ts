export type CreateRouteDTO = {
    routeName: string;
    routeCode: string;
    origin: string;
    destination: string;
    distance: string;
    status: string;
}

export type UpdateRouteDTO = {
    routeName?: string;
    routeCode?: string;
    origin?: string;
    destination?: string;
    distance?: string;
    status?: string;
}
