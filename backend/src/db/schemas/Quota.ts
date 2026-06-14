import {pgTable, uuid, text, timestamp, integer} from 'drizzle-orm/pg-core';
import {Routes} from './DispatchRoutes';
import { Cooperatives } from './Cooperative';

export const Quotas = pgTable("quotas", {
    quotaId: uuid("quota_id").primaryKey().defaultRandom(),

    routeId: uuid("route_id").references(() => Routes.routeId).notNull(),
    maxVehicles: text("max_vehicles").notNull(),
    targetQuota: integer("target_quota").notNull(), // Target quota per unit in an assigned route, quota varies in every routes
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    cooperativeId: uuid("cooperative_id").references(() => Cooperatives.cooperativeId).notNull() // FK
})

// Types export
export type Quotas = typeof Quotas.$inferSelect;
export type NewQuotas = typeof Quotas.$inferInsert;
