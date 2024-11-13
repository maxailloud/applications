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
        username: text('username').notNull(),
    }
);

export const usersRelations = relations(users, ({many}) => ({
    usersToFriends: many(usersToFriends),
    usersToGroups: many(usersGroups),
}));

export const FRIEND_TABLE_NAME = 'user_friends';
export const usersToFriends = pgTable(FRIEND_TABLE_NAME,
    {
        userId: uuid('user_id').notNull(),
        friendId: uuid('friend_id').notNull(),
    },
    (table) => ({
        pk: primaryKey({columns: [table.userId, table.friendId]}),
        userfk: foreignKey({
            name: 'user_friends',
            columns: [table.userId],
            foreignColumns: [users.id],
        }).onDelete('cascade'),
        friendfk: foreignKey({
            name: 'friend_users',
            columns: [table.friendId],
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
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

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

export const usersToFriendsRelations = relations(usersToFriends, ({one}) => ({
    friend: one(users, {
        fields: [usersToFriends.friendId],
        references: [users.id],
    }),
    user: one(users, {
        fields: [usersToFriends.userId],
        references: [users.id],
    }),
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertGroup = typeof groups.$inferInsert;
export type SelectGroup = typeof groups.$inferSelect;

export type InsertExpense = typeof expenses.$inferInsert;
export type SelectExpense = typeof expenses.$inferSelect;
