import {pgTable, uuid, text, timestamp} from 'drizzle-orm/pg-core';
import { Cooperatives } from './Cooperative';

export const Vehicles = pgTable("vehicles", {
    vehicleId: uuid("vehicle_id").primaryKey().defaultRandom(),
    plateNumber: text("license_plate").notNull().unique(),
    unitNumber: text("unit_number").notNull().unique(),
    make: text("make").notNull(),
    model: text("model").notNull(),
    year: text("year").notNull(),
    capacity: text("capacity").notNull(),
    type: text("type").notNull(), // Modern or Traditional
    status: text("status").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    // Foreign Key to Cooperative
    cooperativeId: uuid("cooperative_id").references(() => Cooperatives.cooperativeId).notNull(),
})

// Type exports
export type Vehicles = typeof Vehicles.$inferSelect;
export type NewVehicles = typeof Vehicles.$inferInsert;