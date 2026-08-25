<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Database types

Derive database types from the Drizzle schema — never hand-write custom or partial
shapes for table rows. Export `typeof table.$inferSelect` (and `$inferInsert` when
needed) from `lib/db/schema.ts` and import it. When a consumer needs only some
columns, narrow with `Pick<Row, ...>` / `Omit<Row, ...>` rather than redeclaring a
literal type. Don't add an insert type where `db.insert(...).values()` already
enforces the shape.

# React Flow

The canvas is built on React Flow (`@xyflow/react`, v12). Do not write React Flow
code from memory — the v11 → v12 rename moved the package, the CSS path, and
several hook and prop names. Before adding or changing any React Flow component,
hook, prop, or type, fetch <https://reactflow.dev/llms.txt> and follow the page it
points at for the API in question.

One correction that index gets wrong: it still names the v11 package `reactflow`
with `reactflow/dist/style.css`. This project is on v12 — import from
`@xyflow/react` and `@xyflow/react/dist/style.css`.

<!-- TRIGGER.DEV SKILLS START -->
## Trigger.dev agent skills

This project has Trigger.dev agent skills installed in `.agents/skills/`. Before writing or changing Trigger.dev code (background tasks, scheduled tasks, realtime, or chat.agent AI agents), load the most relevant skill: `trigger-authoring-chat-agent`, `trigger-authoring-tasks`, `trigger-chat-agent-advanced`, `trigger-cost-savings`, `trigger-getting-started`, `trigger-realtime-and-frontend`.
<!-- TRIGGER.DEV SKILLS END -->
