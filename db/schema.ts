import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const plants = sqliteTable("plants", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  info: text("info").notNull(),
  imageUrl: text("image_url").notNull(),
});
