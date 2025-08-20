import { relations } from "drizzle-orm/relations";
import { tag, video, tagVideo } from "./schema";

// tag 关系
export const tagRelations = relations(tag, ({ many }) => ({
  tagVideos: many(tagVideo), // tag → tagVideo
}));

// video 关系
export const videoRelations = relations(video, ({ many }) => ({
  tagVideos: many(tagVideo), // video → tagVideo
}));

// tagVideo 关系（多对多桥接）
export const tagVideoRelations = relations(tagVideo, ({ one }) => ({
  tag: one(tag, {
    fields: [tagVideo.tagId],
    references: [tag.id],
  }),
  video: one(video, {
    fields: [tagVideo.videoId],
    references: [video.id],
  }),
}));
