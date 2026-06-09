import {relations} from "drizzle-orm";

import {Vehicles} from "../schemas/Vehicle";
import {Cooperatives} from "../schemas/Cooperative";
import {Dispatches} from "../schemas/Dispatch";

/*
This file defines the relationships between the Vehicle table and other 
related tables in the database.

Vehicle belongs to one Cooperative
*/

export const vehicleRelations = relations(Vehicles, ({one, many}) => ({
    cooperative: one(Cooperatives, {
        fields: [Vehicles.cooperativeId],
        references: [Cooperatives.cooperativeId],
    }),
    dispatches: many(Dispatches)
}))