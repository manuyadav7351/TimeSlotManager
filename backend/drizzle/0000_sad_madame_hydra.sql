CREATE TABLE "timeslots" (
	"id" serial PRIMARY KEY NOT NULL,
	"time" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "timezones" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"offset" double precision NOT NULL
);
