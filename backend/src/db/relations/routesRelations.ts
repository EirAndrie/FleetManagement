import {relations} from "drizzle-orm";

import { Dispatches } from "../schemas/Dispatch";
import { Routes } from "../schemas/DispatchRoutes";

/*
This file defines the relationships between the Route table and other 
related tables in the database.

Route has many Dispatches
*/

export const routeRelations = relations(Routes, ({ many }) => ({
    dispatches: many(Dispatches),
  })
);