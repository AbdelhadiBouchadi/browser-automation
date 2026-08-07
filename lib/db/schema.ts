import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

// Column names are derived as snake_case — see `casing` in drizzle.config.ts
// and in the client, which must stay in sync.

export const workflowStatus = pgEnum("workflow_status", [
  "draft",
  "active",
  "paused",
  "archived",
])

export const workflows = pgTable(
  "workflows",
  {
    id: uuid().primaryKey().defaultRandom(),
    orgId: text().notNull(),
    name: text().notNull(),
    graph: jsonb("graph"),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("workflows_org_id_idx").on(table.orgId)]
)

export type Workflow = typeof workflows.$inferSelect
export type NewWorkflow = typeof workflows.$inferInsert
