import {relations} from "drizzle-orm";

import { Vehicles } from "../schemas/Vehicle";
import { Drivers } from "../schemas/Driver";
import { Routes } from "../schemas/DispatchRoutes";
import { Users } from "../schemas/User";
import { Dispatches } from "../schemas/Dispatch";

/*
This file defines the relationships between the Dispatch table and other 
related tables in the database.

Dispatch has one Vehicle, one Driver, one Route, and one User
*/

export const dispatchRelations = relations(Dispatches, ({ one }) => ({
    vehicle: one(Vehicles, {
      fields: [Dispatches.vehicleId],
      references: [Vehicles.vehicleId],
    }),

    driver: one(Drivers, {
      fields: [Dispatches.driverId],
      references: [Drivers.driverId],
    }),

    route: one(Routes, {
      fields: [Dispatches.routeId],
      references: [Routes.routeId],
    }),

    createdBy: one(Users, {
      fields: [Dispatches.createdBy],
      references: [Users.userId],
    }),
  })
);