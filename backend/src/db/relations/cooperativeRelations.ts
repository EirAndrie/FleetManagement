import {relations} from "drizzle-orm";

import {Cooperatives} from "../schemas/Cooperative";
import {Users} from "../schemas/User";
import {Vehicles} from "../schemas/Vehicle";
import { Drivers } from "../schemas/Driver";

/*
This file defines the relationships between the Cooperative table and other 
related tables in the database.

Cooperative has many Users, Drivers, and Vehicles
*/

export const cooperativeRelations = relations(Cooperatives, ({many}) => ({
    users: many(Users),
    drivers: many(Drivers),
    vehicles: many(Vehicles),
}))