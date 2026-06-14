import {pgTable, uuid, text, timestamp} from 'drizzle-orm/pg-core';
import {Vehicles} from './Vehicle';
import {Drivers} from './Driver';
import {Users} from './User';
import { Routes } from './DispatchRoutes';
import { Cooperatives } from './Cooperative';

export const Dispatches = pgTable("dispatches", {
    dispatchId: uuid("dispatch_id").primaryKey().defaultRandom(),

    dispatchDate: timestamp("dispatch_date").notNull(),
    dispatchTime: timestamp("dispatch_time").notNull(),
    endTime: timestamp("end_time"),
    status: text("status").notNull(),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    // Foreign Key to Vehicle
    vehicleId: uuid("vehicle_id").references(() => Vehicles.vehicleId).notNull(),

    // Foreign Key to Driver
    driverId: uuid("driver_id").references(() => Drivers.driverId).notNull(),

    // Foreign Key to Route
    routeId: uuid("route_id").references(() => Routes.routeId).notNull(),

    // Foreign Key to User (who created the dispatch)
    createdBy: uuid("created_by").references(() => Users.userId).notNull(),

    cooperativeId: uuid("cooperative_id").references(() => Cooperatives.cooperativeId).notNull(),
})

// Type exports
export type Disptaches = typeof Dispatches.$inferSelect;
export type NewDispatches = typeof Dispatches.$inferInsert;