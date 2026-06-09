import {pgTable, uuid, text, timestamp} from 'drizzle-orm/pg-core';

export const Cooperatives = pgTable("cooperatives", {
    cooperativeId: uuid("cooperative_id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    address: text("address").notNull(),
    contactNumber: text("contact_number").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Type export
export type Cooperative = typeof Cooperatives.$inferSelect;
export type NewCooperative = typeof Cooperatives.$inferInsert;