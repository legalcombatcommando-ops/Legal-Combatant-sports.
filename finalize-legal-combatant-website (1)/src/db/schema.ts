import { boolean, customType, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

// Small binary site assets (for example the Founder's portrait) that the owner uploads after deploy.
export const siteAssets = pgTable("site_assets", {
  key: varchar("key", { length: 60 }).primaryKey(),
  contentType: varchar("content_type", { length: 60 }).notNull(),
  data: bytea("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 32 }).unique(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  role: varchar("role", { length: 80 }).notNull(),
  topic: varchar("topic", { length: 100 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 30 }).notNull().default("new"),
  emailDelivery: varchar("email_delivery", { length: 24 }).notNull().default("pending"),
  whatsappDelivery: varchar("whatsapp_delivery", { length: 24 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const fighterApplications = pgTable("fighter_applications", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 32 }).notNull().unique(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  discipline: varchar("discipline", { length: 40 }).notNull(),
  careerStage: varchar("career_stage", { length: 60 }).notNull(),
  needs: jsonb("needs").$type<string[]>().notNull(),
  priority: text("priority").notNull().default(""),
  timeline: varchar("timeline", { length: 40 }).notNull(),
  contactPreference: varchar("contact_preference", { length: 24 }).notNull(),
  whatsappConsent: boolean("whatsapp_consent").notNull().default(false),
  status: varchar("status", { length: 30 }).notNull().default("new"),
  emailDelivery: varchar("email_delivery", { length: 24 }).notNull().default("pending"),
  whatsappDelivery: varchar("whatsapp_delivery", { length: 24 }).notNull().default("pending"),
  consentAt: timestamp("consent_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
