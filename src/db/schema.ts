import { pgTable, unique, bigserial, varchar, bigint, boolean, timestamp, text, pgSequence } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const resourceIdSeq = pgSequence("resource_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "9223372036854775807", cache: "1", cycle: false })
export const carouselIdSeq = pgSequence("carousel_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "9223372036854775807", cache: "1", cycle: false })

export const tag = pgTable("tag", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	name: varchar({ length: 50 }).default('').notNull(),
	pinyin: varchar({ length: 250 }).default('').notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	pid: bigint({ mode: "number" }).default(0).notNull(),
	status: boolean().default(true).notNull(),
	createTime: timestamp("create_time", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	createId: bigint("create_id", { mode: "number" }).default(0).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	updateId: bigint("update_id", { mode: "number" }).default(0).notNull(),
}, (table) => [
	unique("tag_name_unique").on(table.name),
]);

export const video = pgTable("video", {
	id: varchar({ length: 250 }).primaryKey().notNull(),
	name: varchar({ length: 250 }).default('').notNull(),
	enname: varchar({ length: 250 }).default('').notNull(),
	image: varchar({ length: 250 }).default('').notNull(),
	period: varchar({ length: 250 }).default('').notNull(),
	region: varchar({ length: 250 }).default('').notNull(),
	language: varchar({ length: 250 }).default('').notNull(),
	introduction: text().default('').notNull(),
	aliases: varchar({ length: 250 }).default('').notNull(),
	directors: varchar({ length: 250 }).default('').notNull(),
	actors: varchar({ length: 250 }).default('').notNull(),
	playLinks: text("play_links").default('').notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	weight: bigint({ mode: "number" }).default(0).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	resourceId: bigint("resource_id", { mode: "number" }).default(0).notNull(),
	statusStr: varchar("status_str", { length: 50 }).default('').notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	browse: bigint({ mode: "number" }).default(0).notNull(),
	status: boolean().default(true).notNull(),
	createTime: timestamp("create_time", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	createId: bigint("create_id", { mode: "number" }).default(0).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	updateId: bigint("update_id", { mode: "number" }).default(0).notNull(),
}, (table) => [
	unique("dvideo_name_unique").on(table.name),
]);

export const tagVideo = pgTable("tag_video", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	videoId: varchar("video_id", { length: 250 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	tagId: bigint("tag_id", { mode: "number" }).default(0).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	createId: bigint("create_id", { mode: "number" }).default(0).notNull(),
	createTime: timestamp("create_time", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("video_tag_unique").on(table.videoId, table.tagId),
]);
