import { useEffect, useState } from 'react'
import './CameraFeed.css'

const LINE = '#8fb59a'
const DIM = '#4f6b57'

function Room({ children }) {
  // Habitación en perspectiva: pared de fondo + líneas de fuga + piso.
  return (
    <>
      <rect width="320" height="200" fill="#0e1510" />
      <rect x="70" y="30" width="180" height="92" fill="#16211a" stroke={DIM} />
      <path d={`M0 0 L70 30 M320 0 L250 30 M0 200 L70 122 M320 200 L250 122`} stroke={DIM} />
      {[140, 160, 185].map((y) => (
        <line key={y} x1={70 - (y - 122) * 0.9} x2={250 + (y - 122) * 0.9} y1={y} y2={y} stroke={DIM} opacity=".5" />
      ))}
      {children}
    </>
  )
}

function Desk({ x, y, s = 1, monitor = true, chair = true }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={LINE} fill="#1a271f" strokeWidth={1.2 / s}>
      <path d="M-26 0 L26 0 L32 12 L-32 12 Z" />
      <line x1="-28" y1="12" x2="-28" y2="26" />
      <line x1="28" y1="12" x2="28" y2="26" />
      {monitor && <rect x="-9" y="-16" width="18" height="14" />}
      {chair && <path d="M-8 18 h16 v10 h-16 Z M-6 28 v6 M6 28 v6" />}
    </g>
  )
}

const SCENES = {
  office: (
    <Room>
      <Desk x={115} y={112} s={0.6} />
      <Desk x={160} y={112} s={0.6} />
      <Desk x={205} y={112} s={0.6} />
      <Desk x={95} y={142} s={0.85} />
      <Desk x={160} y={142} s={0.85} />
      <Desk x={225} y={142} s={0.85} />
      <rect x="148" y="48" width="24" height="44" fill="#0b120d" stroke={LINE} />
    </Room>
  ),
  meeting: (
    <Room>
      <rect x="110" y="42" width="100" height="40" fill="#1a271f" stroke={LINE} />
      <text x="160" y="58" textAnchor="middle" fill={LINE} fontSize="8" fontFamily="monospace">AGENDA:</text>
      <line x1="125" x2="195" y1="68" y2="68" stroke={DIM} />
      <path d="M95 140 L225 140 L250 170 L70 170 Z" fill="#1a271f" stroke={LINE} />
      {[90, 120, 150, 180, 210].map((x) => (
        <rect key={x} x={x + 4} y="124" width="14" height="12" fill="none" stroke={LINE} />
      ))}
      {[80, 115, 150, 185, 220].map((x) => (
        <rect key={x} x={x + 8} y="174" width="16" height="14" fill="none" stroke={LINE} />
      ))}
    </Room>
  ),
  break: (
    <Room>
      <rect x="205" y="50" width="34" height="72" fill="#1a271f" stroke={LINE} />
      <line x1="205" x2="239" y1="78" y2="78" stroke={LINE} />
      <rect x="86" y="72" width="30" height="50" fill="#1a271f" stroke={LINE} />
      <rect x="92" y="80" width="18" height="10" fill="none" stroke={LINE} />
      <ellipse cx="160" cy="150" rx="42" ry="12" fill="#1a271f" stroke={LINE} />
      <line x1="160" x2="160" y1="162" y2="186" stroke={LINE} />
      <path d="M148 140 h10 v8 h-10 Z M158 142 q5 2 0 5" fill="none" stroke={LINE} />
    </Room>
  ),
  boss: (
    <Room>
      <rect x="120" y="40" width="80" height="54" fill="#1a271f" stroke={LINE} />
      {[48, 56, 64, 72, 80, 88].map((y) => (
        <line key={y} x1="122" x2="198" y1={y} y2={y} stroke={DIM} />
      ))}
      <rect x="138" y="100" width="44" height="34" rx="4" fill="#0b120d" stroke={LINE} />
      <path d="M90 140 L230 140 L245 160 L75 160 Z" fill="#1a271f" stroke={LINE} />
      <rect x="146" y="132" width="28" height="7" fill="none" stroke={LINE} />
    </Room>
  ),
  427: (
    <Room>
      <rect x="146" y="44" width="28" height="78" fill="#0b120d" stroke={LINE} />
      <path d="M95 140 L225 140 L240 160 L80 160 Z" fill="#1a271f" stroke={LINE} />
      <rect x="138" y="104" width="44" height="32" fill="#b8e6c2" className="feed__monitor" stroke={LINE} />
      <circle cx="160" cy="146" r="12" fill="#070b08" />
      <path d="M134 200 Q136 160 160 158 Q184 160 186 200 Z" fill="#070b08" />
    </Room>
  ),
}

function useTicker() {
  const [s, setS] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setS((v) => (v + 1) % 60), 1000)
    return () => clearInterval(id)
  }, [])
  return s
}

const ytEmbed = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`

/**
 * Transmisión de cámara. Con `cam.youtube`, la vista grande incrusta el video de YouTube
 * y la miniatura usa su portada; sin él, se dibuja la escena simulada.
 */
export default function CameraFeed({ cam, big = false }) {
  const sec = useTicker()

  if (cam.youtube && big) {
    return (
      <div className="feed feed--video">
        <iframe
          className="feed__yt"
          src={ytEmbed(cam.youtube)}
          title={`CAM ${cam.id} · ${cam.name}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    )
  }

  if (cam.youtube) {
    return (
      <div className="feed">
        <img className="feed__scene feed__thumb" src={`https://i.ytimg.com/vi/${cam.youtube}/hqdefault.jpg`} alt="" loading="lazy" />
        <div className="feed__scan" aria-hidden />
        <div className="feed__hud">
          <span className="feed__rec">● REC</span>
          <span className="feed__play" aria-hidden>▶</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`feed ${big ? 'feed--big' : ''}`}>
      <svg className="feed__scene" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {SCENES[cam.scene]}
      </svg>
      <div className="feed__noise" aria-hidden />
      <div className="feed__scan" aria-hidden />
      <div className="feed__hud">
        {big && <span>CAM {cam.id}</span>}
        <span className="feed__rec">● REC</span>
        {big && <span className="feed__name">{cam.name}</span>}
        {big && <span className="feed__time">02/11/2002 24:00:{String(sec).padStart(2, '0')}</span>}
        {big && <span className="feed__occ">Ocupación: {cam.occupancy}</span>}
      </div>
    </div>
  )
}
