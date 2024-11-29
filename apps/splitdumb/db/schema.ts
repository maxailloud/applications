import { relations } from 'drizzle-orm';
import { foreignKey, numeric, pgSchema, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const authSchema = pgSchema('auth');

const authUsers = authSchema.table('users', {
    id: uuid('id').primaryKey().notNull(),
    email: text('email').notNull(),
});

export const USER_PROFILE_TABLE_NAME = 'user_profiles';
export const users = pgTable(USER_PROFILE_TABLE_NAME,
    {
        id: uuid('id')
            .primaryKey()
            .notNull()
            .references(() => authUsers.id, {onDelete: 'cascade'}),
        email: text('email').notNull().unique(),
        username: text('username').notNull(),
    }
);

export const usersRelations = relations(users, ({many}) => ({
    usersToContacts: many(usersToContacts),
    usersToGroups: many(usersGroups),
}));

export const USER_CONTACT_TABLE_NAME = 'user_contacts';
export const usersToContacts = pgTable(USER_CONTACT_TABLE_NAME,
    {
        userId: uuid('user_id').notNull(),
        contactId: uuid('contact_id').notNull(),
    },
    (table) => ({
        pk: primaryKey({columns: [table.userId, table.contactId]}),
        userfk: foreignKey({
            name: 'user_contacts',
            columns: [table.userId],
            foreignColumns: [users.id],
        }).onDelete('cascade'),
        contactfk: foreignKey({
            name: 'contact_users',
            columns: [table.contactId],
            foreignColumns: [users.id],
        }).onDelete('cascade'),
    }),
);

export const GROUP_TABLE_NAME = 'groups';
export const groups = pgTable(GROUP_TABLE_NAME, {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    icon: text('icon').notNull(),
    currency: text('currency').notNull(),
    creatorId: uuid('creator_id')
        .notNull()
        .references(() => users.id, {onDelete: 'cascade'}),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const groupsRelations = relations(groups, ({many}) => ({
    usersToCreatedGroups: many(users),
    usersToGroups: many(usersGroups),
}));

export const USER_GROUP_TABLE_NAME = 'users_groups';
export const usersGroups = pgTable(USER_GROUP_TABLE_NAME,
    {
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id),
        groupId: uuid('group_id')
            .notNull()
            .references(() => groups.id),
    },
    (table) => ({
        pk: primaryKey({columns: [table.userId, table.groupId]}),
    }),
);

export const EXPENSE_TABLE_NAME = 'expenses';
export const expenses = pgTable(EXPENSE_TABLE_NAME, {
    id: uuid('id').primaryKey().defaultRandom(),
    description: text('description').notNull(),
    amount: numeric('amount', {precision: 7, scale: 2}).notNull(),
    currency: text('currency').notNull(),
    groupId: uuid('group_id')
        .notNull()
        .references(() => groups.id, {onDelete: 'cascade'}),
    creatorId: uuid('creator_id')
        .notNull()
        .references(() => users.id, {onDelete: 'cascade'}),
    payeeId: uuid('payee_id')
        .notNull()
        .references(() => users.id, {onDelete: 'cascade'}),
    occurredAt: timestamp('occurred_at').notNull().defaultNow(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const EXPENSE_AMOUNT_TABLE_NAME = 'expenses_amounts';
export const expensesAmounts = pgTable(EXPENSE_AMOUNT_TABLE_NAME,
    {
        expenseId: uuid('expense_id')
            .notNull()
            .references(() => expenses.id, {onDelete: 'cascade'}),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id),
        amount: numeric('amount', {precision: 7, scale: 2}).notNull(),
    },
    (table) => ({
        pk: primaryKey({columns: [table.expenseId, table.userId]}),
    }),
);

export const usersToGroupsRelations = relations(usersGroups, ({one}) => ({
    group: one(groups, {
        fields: [usersGroups.groupId],
        references: [groups.id],
    }),
    user: one(users, {
        fields: [usersGroups.userId],
        references: [users.id],
    }),
}));

export const usersToContactsRelations = relations(usersToContacts, ({one}) => ({
    contact: one(users, {
        fields: [usersToContacts.contactId],
        references: [users.id],
    }),
    user: one(users, {
        fields: [usersToContacts.userId],
        references: [users.id],
    }),
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertGroup = typeof groups.$inferInsert;
export type SelectGroup = typeof groups.$inferSelect;

export type InsertExpense = typeof expenses.$inferInsert;
export type SelectExpense = typeof expenses.$inferSelect;

export type InsertExpenseAmount = typeof expensesAmounts.$inferInsert;
export type SelectExpenseAmount = typeof expensesAmounts.$inferSelect;
