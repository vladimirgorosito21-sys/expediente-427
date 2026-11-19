import { useState } from 'react'
import Window from '../Window'
import CameraFeed from '../CameraFeed'
import './CamarasWindow.css'

// Piezas audiovisuales: `youtube` es el ID del video (lo que va después de "watch?v=").
// Las cámaras sin `youtube` muestran la transmisión simulada.
const CAMS = [
  { id: '01', short: 'Oficinas', name: 'Oficinas · Planta principal', scene: 'office', occupancy: 0, youtube: 'UXLvcnxCXDM' },
  { id: '02', short: 'Reuniones', name: 'Sala de reuniones B', scene: 'meeting', occupancy: 0, youtube: '8xrJ5swjD4Y' },
  { id: '03', short: 'Descanso', name: 'Sala de descanso', scene: 'break', occupancy: 0, youtube: 'JL80NIw0I2Q' },
  { id: '04', short: 'Jefatura', name: 'Oficina de jefatura', scene: 'boss', occupancy: 0 },
  { id: '05', short: 'Of. 427', name: 'Oficina 427', scene: '427', occupancy: 1 },
]

const PLACES = ['Escritorio', 'Mis documentos', 'Mi PC', 'Red']

// Posiciones del componente "Átomo / carpeta ventana" escalado a 1019 × 708
const PLACE_TOPS = [182, 217, 255, 293]
const CAM_TOPS = [394, 436.5, 471.5, 509.5, 544.5]
const THUMB_LEFTS = [287, 445, 596.3, 747.5]

export default function CamarasWindow({ onCam, onPlace, ...win }) {
  const [sel, setSel] = useState(null)
  const pick = (cam) => {
    setSel(cam.id)
    onCam?.(cam)
  }
  const selected = CAMS.find((c) => c.id === sel)

  return (
    <Window {...win} title="Cámaras" x={237} y={75} w={1019} h={708}>
      <div className="cams">
        <div className="cams__toolbar">
          <div className="cams__buttons">
            <span>◄ Atrás</span>
            <span>► Adelante</span>
            <span>▲ Arriba</span>
            <span className="cams__sep" />
            <span>Ver: Miniaturas</span>
          </div>
          <div className="cams__address">
            <span>Dirección</span>
            <div className="cams__field">C:\Wingows\Seguridad\Cámaras\</div>
            <span className="cams__status">5 dispositivos · 1 persona detectada</span>
          </div>
        </div>

        <nav className="cams__side" aria-label="Lugares y cámaras">
          <span className="cams__group" style={{ top: 152 - 36 }}>Lugares</span>
          {PLACES.map((p, i) => (
            <button key={p} className="cams__item" style={{ top: PLACE_TOPS[i] - 36 }} onClick={onPlace}>
              {p}
            </button>
          ))}
          <span className="cams__group" style={{ top: 360 - 36 }}>Cámaras</span>
          {CAMS.map((c, i) => (
            <button
              key={c.id}
              className={`cams__item ${sel === c.id ? 'is-active' : ''}`}
              style={{ top: CAM_TOPS[i] - 36 }}
              onClick={() => pick(c)}
              aria-pressed={sel === c.id}
            >
              CAM {c.id} · {c.short}
            </button>
          ))}
        </nav>

        <div className="cams__main" />
        {CAMS.slice(0, 4).map((c, i) => (
          <button
            key={c.id}
            className={`cams__thumb ${sel === c.id ? 'is-active' : ''}`}
            style={{ left: THUMB_LEFTS[i], top: 182 - 36 }}
            onClick={() => pick(c)}
            aria-label={`Ver cámara ${c.id}: ${c.name}`}
          >
            <CameraFeed cam={c} />
            <span className="cams__thumb-label">CAM {c.id}</span>
          </button>
        ))}

        <div className="cams__viewer" style={{ top: 330 - 36 }}>
          {selected ? (
            <CameraFeed key={selected.id} cam={selected} big />
          ) : (
            <p className="cams__empty">Seleccione una cámara para ver la transmisión en vivo.</p>
          )}
        </div>
      </div>
    </Window>
  )
}
