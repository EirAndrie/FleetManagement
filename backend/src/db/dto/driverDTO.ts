export type CreateDriverDTO = {
    cooperativeId: string // FK

    firstName: string;
    lastName: string;
    middleName: string;

    phoneNumber: string;
    licenseNumber: string;
    licenseExpiry: string;
    status: string
}

export type UpdateDriverDTO = {
    driverId: string;

    firstName?: string;
    lastName?: string;
    middleName?: string;

    phoneNumber?: string;
    licenseNumber?: string;
    licenseExpiry?: Date;
    status?: string
}