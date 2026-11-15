import { createContext, useEffect, useState } from 'react'
import './Stage.css'

export const STAGE_W = 1440
export const STAGE_H = 1024

// eslint-disable-next-line react-refresh/only-export-components
export const ScaleContext = createContext(1)

function measure() {
  const w = window.innerWidth
  const h = window.innerHeight
  const s = Math.min(w / STAGE_W, h / STAGE_H)
  return { s, x: (w - STAGE_W * s) / 2, y: (h - STAGE_H * s) / 2, portrait: h > w && w < 820 }
}

/**
 * El diseño está hecho a 1440×1024. El escenario conserva esas coordenadas
 * y se escala para entrar en cualquier pantalla (con bandas si hace falta).
 */
export default function Stage({ children }) {
  const [box, setBox] = useState(measure)
  const [rotateDismissed, setRotateDismissed] = useState(false)

  useEffect(() => {
    const onResize = () => setBox(measure())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="viewport">
      <ScaleContext.Provider value={box.s}>
        <div
          className="stage"
          style={{ transform: `translate(${box.x}px, ${box.y}px) scale(${box.s})` }}
        >
          {children}
        </div>
      </ScaleContext.Provider>

      {box.portrait && !rotateDismissed && (
        <div className="rotate-hint" role="dialog" aria-label="Sugerencia de orientación">
          <p>
            Stanley giró su dispositivo. Bueno, en realidad no lo hizo, pero el narrador
            se lo sugiere con mucha insistencia: esta oficina se ve mejor en horizontal.
          </p>
          <button className="w-btn" onClick={() => setRotateDismissed(true)}>
            Continuar igual
          </button>
        </div>
      )}
    </div>
  )
}
