import {relations} from "drizzle-orm";

import {Users} from "../schemas/User";
import {Cooperatives} from "../schemas/Cooperative";
import {Dispatches} from "../schemas/Dispatch";

/*
This file defines the relationships between the User table and other 
related tables in the database.

User belongs to one Cooperative
*/

export const userRelations = relations(Users, ({one, many}) => ({
    cooperative: one(Cooperatives, {
        fields: [Users.cooperativeId],
        references: [Cooperatives.cooperativeId],
    }),
    dispatches: many(Dispatches)
}))