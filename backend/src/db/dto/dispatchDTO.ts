export type CreateDispatchDTO = {
    dispatchDate: Date;
    dispatchTime: Date;
    endTime?: Date;
    status: string;

    vehicleId: string;
    driverId: string;
    routeId: string;
    createdBy: string;
}

export type UpdateDispatchDTO = {
    dispatchDate?: Date;
    dispatchTime?: Date;
    endTime?: Date;
    status?: string;

    vehicleId?: string;
    driverId?: string;
    routeId?: string;
    createdBy?: string;
}
