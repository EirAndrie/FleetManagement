import {pgTable, uuid, text, timestamp} from 'drizzle-orm/pg-core';
import {Cooperatives} from './Cooperative';

export const Drivers = pgTable("drivers", {
    driverId: uuid("driver_id").primaryKey().defaultRandom(),

    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    middleName: text("middle_name"),

    phoneNumber: text("phone_number").notNull(),
    licenseNumber: text("license_number").notNull().unique(),
    licenseExpiry: timestamp("license_expiry").notNull(),
    status: text("status").notNull().default("Active"),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    // Foreign Key to Cooperative
    cooperativeId: uuid("cooperative_id").references(() => Cooperatives.cooperativeId).notNull(),
})

// Type exports
export type Drivers = typeof Drivers.$inferSelect;
export type NewDrivers = typeof Drivers.$inferInsert;
