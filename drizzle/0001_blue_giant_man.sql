PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_flight_bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`destination_id` text NOT NULL,
	`airline` text NOT NULL,
	`price` integer NOT NULL,
	`departure_time` text NOT NULL,
	`arrival_time` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_flight_bookings`("id", "destination_id", "airline", "price", "departure_time", "arrival_time", "created_at") SELECT "id", "destination_id", "airline", "price", "departure_time", "arrival_time", "created_at" FROM `flight_bookings`;--> statement-breakpoint
DROP TABLE `flight_bookings`;--> statement-breakpoint
ALTER TABLE `__new_flight_bookings` RENAME TO `flight_bookings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_hotel_bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`destination_id` text NOT NULL,
	`name` text NOT NULL,
	`price` integer NOT NULL,
	`check_in` text NOT NULL,
	`check_out` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_hotel_bookings`("id", "destination_id", "name", "price", "check_in", "check_out", "created_at") SELECT "id", "destination_id", "name", "price", "check_in", "check_out", "created_at" FROM `hotel_bookings`;--> statement-breakpoint
DROP TABLE `hotel_bookings`;--> statement-breakpoint
ALTER TABLE `__new_hotel_bookings` RENAME TO `hotel_bookings`;