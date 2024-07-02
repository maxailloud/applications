import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const USER_TABLE_NAME = 'property';
export const userTable = pgTable(USER_TABLE_NAME, {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
});

export const PROPERTY_TABLE_NAME = 'property';
export const propertyTable = pgTable(PROPERTY_TABLE_NAME, {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    address: text('address').notNull(),
    userId: integer('user_id')
        .notNull()
        .references(() => userTable.id, {onDelete: 'cascade'}),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export type InsertProperty = typeof propertyTable.$inferInsert;
export type SelectProperty = typeof propertyTable.$inferSelect;
