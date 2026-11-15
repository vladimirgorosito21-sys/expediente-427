import { useContext, useEffect, useRef, useState } from 'react'
import { ScaleContext, STAGE_W } from './Stage'
import folderSmall from '../assets/ui/carpeta-small.svg'
import xIcon from '../assets/ui/x.svg'
import './Window.css'

/**
 * Ventana del escritorio.
 * - variant "folder": barra de título dorada (diseño "Átomo / carpeta ventana"), arrastrable.
 * - variant "doc": hoja gris con botón X gris (diseño "Molécula / informe" y "manual del empleado").
 */
export default function Window({
  title,
  icon = folderSmall,
  variant = 'folder',
  x,
  y,
  w,
  h,
  z,
  minimized,
  onFocus,
  onClose,
  bodyRef,
  className = '',
  children,
}) {
  const scale = useContext(ScaleContext)
  const [pos, setPos] = useState({ x, y })
  const drag = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!minimized) closeRef.current?.focus({ preventScroll: true })
  }, [minimized])

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    }
  }

  const dragStart = (e) => {
    if (e.button !== 0 || e.target.closest('button')) return
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const dragMove = (e) => {
    const d = drag.current
    if (!d) return
    const nx = d.ox + (e.clientX - d.sx) / scale
    const ny = d.oy + (e.clientY - d.sy) / scale
    setPos({
      x: Math.min(Math.max(nx, -w + 140), STAGE_W - 140),
      y: Math.min(Math.max(ny, 0), 963 - 40),
    })
  }
  const dragEnd = () => {
    drag.current = null
  }

  return (
    <section
      className={`win win--${variant} ${className}`}
      role="dialog"
      aria-label={title}
      style={{ left: pos.x, top: pos.y, width: w, height: h, zIndex: z, display: minimized ? 'none' : undefined }}
      onPointerDown={onFocus}
      onKeyDown={onKeyDown}
    >
      {variant === 'folder' ? (
        <header
          className="win__titlebar"
          onPointerDown={dragStart}
          onPointerMove={dragMove}
          onPointerUp={dragEnd}
          onPointerCancel={dragEnd}
        >
          <img className="win__icon" src={icon} alt="" />
          <h2 className="win__title">{title}</h2>
          <button ref={closeRef} className="x-gold" onClick={onClose} aria-label={`Cerrar ${title}`}>
            X
          </button>
        </header>
      ) : (
        <button ref={closeRef} className="x-gray" onClick={onClose} aria-label={`Cerrar ${title}`}>
          <img src={xIcon} alt="" width="18.4229" height="18.5938" />
        </button>
      )}
      <div className="win__body" ref={bodyRef}>
        {children}
      </div>
    </section>
  )
}
