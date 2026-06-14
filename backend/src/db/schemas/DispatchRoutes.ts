import {pgTable, uuid, text, timestamp} from 'drizzle-orm/pg-core';
import { Cooperatives } from './Cooperative';

export const Routes = pgTable("routes", {
    routeId: uuid("route_id").primaryKey().defaultRandom(),

    routeName: text("route_name").notNull(),
    routeCode: text("route_code").notNull().unique(),
    origin: text("origin").notNull(),
    destination: text("destination").notNull(),
    distance: text("distance").notNull(),
    status: text("status").notNull(),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    cooperativeId: uuid("cooperative_id").references(() => Cooperatives.cooperativeId).notNull(),
})

// Type exports
export type Routes = typeof Routes.$inferSelect;
export type NewRoutes = typeof Routes.$inferInsert;