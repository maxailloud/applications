import { numeric, pgSchema, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const authSchema = pgSchema('auth');

const users = authSchema.table('users', {
    id: uuid('id').primaryKey(),
});

export const PROPERTY_TABLE_NAME = 'property';
export const propertyTable = pgTable(PROPERTY_TABLE_NAME, {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    address: text('address').notNull(),
    rent: numeric('rent', {precision: 9, scale: 2}).notNull(),
    mortgage: numeric('mortgage', {precision: 9, scale: 2}).notNull(),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, {onDelete: 'cascade'}),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const EXPENSE_TABLE_NAME = 'expense';
export const expenseTable = pgTable(EXPENSE_TABLE_NAME, {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    amount: numeric('amount', {precision: 7, scale: 2}).notNull(),
    propertyId: uuid('property_id')
        .notNull()
        .references(() => propertyTable.id, {onDelete: 'cascade'}),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type InsertProperty = typeof propertyTable.$inferInsert;
export type SelectProperty = typeof propertyTable.$inferSelect;

export type InsertExpense = typeof expenseTable.$inferInsert;
export type SelectExpense = typeof expenseTable.$inferSelect;
