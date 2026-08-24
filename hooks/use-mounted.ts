import * as React from "react"

// The value never changes on its own — it only goes from the server snapshot
// to the client one, which React does as part of hydration — so the
// subscription is a no-op.
const subscribe = () => () => {}

/**
 * `false` during the server render and the hydration pass, `true` afterwards.
 * Gate client-only values (theme, media queries) on this so they are never
 * rendered into markup the server could not have produced.
 */
export function useMounted() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
