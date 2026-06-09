import {relations} from "drizzle-orm"

import {Drivers} from "../schemas/Driver";
import {Cooperatives} from "../schemas/Cooperative";
import {Dispatches} from "../schemas/Dispatch";

/*
This file defines the relationships between the Driver table and other 
related tables in the database.

Driver belongs to one Cooperative
*/

export const driverRelations = relations(Drivers, ({one, many}) => ({
    cooperative: one(Cooperatives, {
        fields: [Drivers.cooperativeId],
        references: [Cooperatives.cooperativeId],
    }),
    dispatches: many(Dispatches)
}))