import { numeric, pgSchema, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const authSchema = pgSchema('auth');

const users = authSchema.table('users', {
    id: uuid('id').primaryKey(),
});

export const GROUP_TABLE_NAME = 'groups';
export const groupTable = pgTable(GROUP_TABLE_NAME, {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    icon: text('icon').notNull(),
    creatorId: uuid('creator_id')
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
    currency: text('currency').notNull(),
    groupId: uuid('group_id')
        .notNull()
        .references(() => groupTable.id, {onDelete: 'cascade'}),
    creatorId: uuid('creator_id')
        .notNull()
        .references(() => users.id, {onDelete: 'cascade'}),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type InsertGroup = typeof groupTable.$inferInsert;
export type SelectGroup = typeof groupTable.$inferSelect;

export type InsertExpense = typeof expenseTable.$inferInsert;
export type SelectExpense = typeof expenseTable.$inferSelect;
