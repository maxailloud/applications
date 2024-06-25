import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users_table', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
});

export const propertyTable = pgTable('property', {
    id: serial('id').primaryKey(),
    name: text('name'),
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
