import { auth, currentUser } from "@clerk/nextjs/server"

import { liveblocks } from "@/lib/liveblocks"

// ID token auth: this endpoint only vouches for *who* the caller is, never for
// which room they asked for — so it deliberately ignores the request body.
// Access is decided by the permissions stored on each room, which means every
// room has to be created with `groupsAccesses: { [orgId]: ["room:write"] }`.
// A room created without any accesses is private and nobody can join it.
export async function POST() {
  const { userId, orgId } = await auth()

  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Rooms are scoped to an organization, so a session with no active org has
  // nothing it could be granted access to.
  if (!orgId) {
    return new Response("An active organization is required", { status: 403 })
  }

  const user = await currentUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { status, body } = await liveblocks.identifyUser(
    {
      userId,
      // The Clerk organization is the group: a room that grants access to this
      // id is joinable by every member of the org, and by no one outside it.
      groupIds: [orgId],
    },
    {
      // Shape comes from `Liveblocks["UserMeta"]["info"]` in liveblocks.config.ts;
      // it is what other clients read as `other.info`.
      userInfo: {
        name:
          user.fullName ??
          user.primaryEmailAddress?.emailAddress ??
          "Anonymous",
        avatar: user.imageUrl,
      },
    }
  )

  return new Response(body, { status })
}
