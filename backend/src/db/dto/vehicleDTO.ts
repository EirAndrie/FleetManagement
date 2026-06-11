export type CreateVehicleDTO = {
    cooperativeId: string; // FK

    plateNumber: string;
    unitNumber: string;
    make: string;
    model: string;
    year: string;
    capactiy: string;
    type: string;
    status: string;
}

export type UpdateVehicleDTO = {
    vehicleId: string; // PK

    plateNumber: string;
    unitNumber: string;
    make: string;
    model: string;
    year: string;
    capactiy: string;
    type: string;
    status: string;
}