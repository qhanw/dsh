-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SEQUENCE "public"."resource_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."carousel_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE TABLE "tag" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(50) DEFAULT '' NOT NULL,
	"matching_words" varchar(250) DEFAULT '' NOT NULL,
	"pid" bigint DEFAULT 0 NOT NULL,
	"status" boolean DEFAULT true NOT NULL,
	"create_time" timestamp with time zone DEFAULT now() NOT NULL,
	"update_time" timestamp with time zone DEFAULT now() NOT NULL,
	"create_id" bigint DEFAULT 0 NOT NULL,
	"update_id" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "video" (
	"id" varchar(250) PRIMARY KEY NOT NULL,
	"name" varchar(250) DEFAULT '' NOT NULL,
	"enname" varchar(250) DEFAULT '' NOT NULL,
	"image" varchar(250) DEFAULT '' NOT NULL,
	"period" varchar(250) DEFAULT '' NOT NULL,
	"region" varchar(250) DEFAULT '' NOT NULL,
	"language" varchar(250) DEFAULT '' NOT NULL,
	"introduction" text DEFAULT '' NOT NULL,
	"aliases" varchar(250) DEFAULT '' NOT NULL,
	"directors" varchar(250) DEFAULT '' NOT NULL,
	"actors" varchar(250) DEFAULT '' NOT NULL,
	"play_links" text DEFAULT '' NOT NULL,
	"weight" bigint DEFAULT 0 NOT NULL,
	"resource_id" bigint DEFAULT 0 NOT NULL,
	"status_str" varchar(50) DEFAULT '' NOT NULL,
	"browse" bigint DEFAULT 0 NOT NULL,
	"status" boolean DEFAULT true NOT NULL,
	"create_time" timestamp with time zone DEFAULT now() NOT NULL,
	"update_time" timestamp with time zone DEFAULT now() NOT NULL,
	"create_id" bigint DEFAULT 0 NOT NULL,
	"update_id" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "dvideo_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "tag_video" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"video_id" varchar(250) NOT NULL,
	"tag_id" bigint DEFAULT 0 NOT NULL,
	"create_id" bigint DEFAULT 0 NOT NULL,
	"create_time" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "video_tag_unique" UNIQUE("video_id","tag_id")
);

*/