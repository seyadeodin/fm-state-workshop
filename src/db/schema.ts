import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const itineraries = sqliteTable('itineraries', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const destinations = sqliteTable('destinations', {
  id: text('id').primaryKey(),
  itineraryId: text('itinerary_id')
    .notNull()
    .references(() => itineraries.id),
  name: text('name').notNull(),
  location: text('location').notNull(),
  arrivalDate: text('arrival_date').notNull(),
  departureDate: text('departure_date').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const activities = sqliteTable('activities', {
  id: text('id').primaryKey(),
  itineraryId: text('itinerary_id')
    .notNull()
    .references(() => itineraries.id),
  destinationId: text('destination_id').references(() => destinations.id),
  name: text('name').notNull(),
  description: text('description'),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const comments = sqliteTable('comments', {
  id: text('id').primaryKey(),
  itineraryId: text('itinerary_id')
    .notNull()
    .references(() => itineraries.id),
  content: text('content').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey(),
  type: text('type').notNull(), // 'flight', 'hotel', or 'car'
  referenceId: text('reference_id').notNull(), // External booking reference
  status: text('status').notNull(), // 'pending', 'confirmed', 'cancelled'
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
