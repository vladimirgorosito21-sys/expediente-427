import { useEffect } from 'react'

/** Llama a `onSeen` una vez cuando `targetRef` queda visible dentro de `rootRef` (contenedor con scroll). */
export function useSeen(rootRef, targetRef, onSeen, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const root = rootRef.current
    const target = targetRef.current
    if (!root || !target) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          onSeen()
        }
      },
      { root, threshold: 1 },
    )
    io.observe(target)
    return () => io.disconnect()
  }, [rootRef, targetRef, onSeen, enabled])
}
