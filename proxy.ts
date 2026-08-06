import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"])

// Session tasks run on a `pending` session, which `auth.protect()` treats as
// signed out — protecting these routes normally would bounce the user back to
// the task and loop.
const isSessionTaskRoute = createRouteMatcher(["/choose-organization(.*)"])

export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) {
    return
  }

  if (isSessionTaskRoute(request)) {
    const { userId, redirectToSignIn } = await auth({
      treatPendingAsSignedOut: false,
    })

    if (!userId) {
      return redirectToSignIn()
    }

    return
  }

  await auth.protect()
})

export const config = {
  matcher: [
    "/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
