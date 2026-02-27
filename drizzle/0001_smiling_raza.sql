CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`destinationSlug` varchar(255) NOT NULL,
	`destinationName` varchar(255) NOT NULL,
	`status` enum('pending','confirmed','cancelled','completed') NOT NULL DEFAULT 'pending',
	`tripStartDate` timestamp,
	`tripEndDate` timestamp,
	`numberOfTravellers` int DEFAULT 1,
	`totalPrice` int,
	`pricingTier` varchar(100),
	`specialRequests` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
