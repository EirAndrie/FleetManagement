import {pgTable, uuid, text, timestamp} from 'drizzle-orm/pg-core';
import { Cooperatives } from './Cooperative';

export const Users = pgTable("users", {
    userId: uuid("user_id").primaryKey().defaultRandom(),

    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    middleName: text("middle_name"),

    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: text("role").notNull(),
    status: text("status").notNull().default("Active"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    // Foreign Key to Cooperative
    cooperativeId: uuid("cooperative_id").references(() => Cooperatives.cooperativeId).notNull(),
})


// Type exports
export type Users = typeof Users.$inferSelect;
export type NewUsers = typeof Users.$inferInsert;