// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  mysqlTable,
  timestamp,
  varchar,
  int,
  primaryKey,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

import type { AdapterAccount } from "next-auth/adapters";
import { randomUUID } from "crypto";

// notice how we are using a seperate table for users
export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date", fsp: 3 }),
  image: varchar("image", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
});

export const oneTimeStripeCustomers = mysqlTable("one_time_stripe_customers", {
  userId: varchar("user_id", { length: 255 })
    .primaryKey()
    .references(() => users.id),
  stripeCustomerId: varchar("stripe_customer_id", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  // these columns are how we will keep track of what the user has purchased
  oneTimePaymentTutorialPurchased: boolean(
    "one_time_payment_tutorial_purchased",
  ).default(false),
  subscriptionTutorialPurchased: boolean(
    "subscription_tutorial_purchased",
  ).default(false),
  usageTutorialPurchased: boolean("usage_tutorial_purchased").default(false),
});

export const subcriptionStripeCustomers = mysqlTable(
  "subscription_stripe_customers",
  {
    userId: varchar("user_id", { length: 255 })
      .primaryKey()
      .references(() => users.id),
    stripeCustomerId: varchar("stripe_customer_id", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),

    // these columns are to keep track of the user's subscription tier and status
    currentSubTier: mysqlEnum("current_sub_tier", [
      "none",
      "basic",
      "essential",
      "growth",
    ]).default("none"),
    currentSubStatus: mysqlEnum("current_sub_status", [
      "active",
      "inactive",
      "canceled",
    ]),
  },
);

// for usage we are going to do a credit based system
// but it is also possible do something based around
// the usage of a resource (compute, storage, etc)
export const usageStripeCustomers = mysqlTable("usage_stripe_customers", {
  userId: varchar("user_id", { length: 255 })
    .primaryKey()
    .references(() => users.id),
  stripeCustomerId: varchar("stripe_customer_id", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  credits: bigint("credits", { mode: "number" }).default(0),
});

// you can ingore these tables, they are for next-auth
export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = mysqlTable("session" as string, {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().unique(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
