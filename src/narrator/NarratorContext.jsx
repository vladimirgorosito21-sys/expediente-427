import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const NarratorCtx = createContext(null)

/**
 * Un mensaje del narrador:
 *   { pages: string[], choices?: [{label, onSelect}], once?: string, onDone?: fn }
 * - `once`: clave para que la línea se diga una sola vez por partida.
 * - `onDone`: se ejecuta cuando el usuario cierra o termina el mensaje.
 */
function normalize(m) {
  if (typeof m === 'string') return { pages: [m] }
  if (m.text) return { ...m, pages: [m.text] }
  return m
}

export function NarratorProvider({ children }) {
  const [msg, setMsg] = useState(null)
  const current = useRef(null)
  const queue = useRef([])
  const said = useRef(new Set())

  const show = useCallback((m) => {
    current.current = m
    setMsg(m)
  }, [])

  const say = useCallback(
    (raw, { queue: enqueue = false } = {}) => {
      const m = normalize(raw)
      if (m.once) {
        if (said.current.has(m.once)) return false
        said.current.add(m.once)
      }
      const entry = { ...m, page: 0, key: Math.random().toString(36).slice(2) }
      if (enqueue && current.current) {
        queue.current.push(entry)
        return true
      }
      if (!enqueue) queue.current = []
      show(entry)
      return true
    },
    [show],
  )

  const finish = useCallback(() => {
    const m = current.current
    const next = queue.current.shift()
    show(next ? { ...next, page: 0 } : null)
    m?.onDone?.()
  }, [show])

  const advance = useCallback(() => {
    const m = current.current
    if (!m) return
    if (m.page < m.pages.length - 1) {
      show({ ...m, page: m.page + 1 })
      return
    }
    if (m.choices) return
    finish()
  }, [finish, show])

  const dismiss = useCallback(() => {
    const m = current.current
    queue.current = []
    show(null)
    m?.onDone?.()
  }, [show])

  const choose = useCallback(
    (choice) => {
      queue.current = []
      show(null)
      choice.onSelect?.()
    },
    [show],
  )

  const hasSaid = useCallback((id) => said.current.has(id), [])

  const value = useMemo(
    () => ({ msg, say, advance, dismiss, choose, hasSaid }),
    [msg, say, advance, dismiss, choose, hasSaid],
  )

  return <NarratorCtx.Provider value={value}>{children}</NarratorCtx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNarrator() {
  return useContext(NarratorCtx)
}
