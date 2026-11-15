import { useEffect, useState } from 'react'
import { useNarrator } from './NarratorContext'
import './Narrator.css'

const SPEED = 22 // ms por carácter

/** Personaje original: un micrófono de estudio con ojos. El narrador nunca muestra su cara. */
function MicCharacter({ talking }) {
  return (
    <svg className={`mic ${talking ? 'mic--talking' : ''}`} viewBox="0 0 90 130" aria-hidden>
      <defs>
        <linearGradient id="micBody" x1="0" x2="1">
          <stop offset="0" stopColor="#8d98a5" />
          <stop offset="0.45" stopColor="#e9edf2" />
          <stop offset="1" stopColor="#7b8693" />
        </linearGradient>
        <linearGradient id="micGold" x1="0" x2="1">
          <stop offset="0" stopColor="#96701d" />
          <stop offset="0.5" stopColor="#f3e2bf" />
          <stop offset="1" stopColor="#96701d" />
        </linearGradient>
      </defs>
      <ellipse cx="45" cy="124" rx="26" ry="5" fill="rgba(0,0,0,.25)" />
      <rect x="41" y="88" width="8" height="26" rx="2" fill="#5d6670" />
      <rect x="24" y="112" width="42" height="8" rx="4" fill="#3e454d" />
      <path d="M18 62 Q18 92 45 92 Q72 92 72 62" fill="none" stroke="#5d6670" strokeWidth="5" />
      <rect x="20" y="6" width="50" height="78" rx="25" fill="url(#micBody)" stroke="#4d5560" strokeWidth="2" />
      {[18, 26, 34].map((y) => (
        <line key={y} x1="26" x2="64" y1={y} y2={y} stroke="#59626d" strokeWidth="1.4" opacity=".7" />
      ))}
      <rect x="20" y="40" width="50" height="9" fill="url(#micGold)" />
      <g className="mic__eyes">
        <ellipse cx="36" cy="62" rx="7" ry="8" fill="#fff" stroke="#333" strokeWidth="1.2" />
        <ellipse cx="54" cy="62" rx="7" ry="8" fill="#fff" stroke="#333" strokeWidth="1.2" />
        <circle className="mic__pupil" cx="37.5" cy="63" r="3.2" fill="#1d1d1d" />
        <circle className="mic__pupil" cx="55.5" cy="63" r="3.2" fill="#1d1d1d" />
      </g>
      <path d="M33 52 L40 54 M57 52 L50 54" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function Narrator({ onCharacterClick }) {
  const { msg, advance, dismiss, choose } = useNarrator()
  const text = msg ? msg.pages[msg.page] : ''
  const [shown, setShown] = useState(0)

  useEffect(() => {
    setShown(0)
    if (!text) return
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= text.length) clearInterval(id)
        return Math.min(n + 1, text.length)
      })
    }, SPEED)
    return () => clearInterval(id)
  }, [text, msg?.key])

  const typing = !!msg && shown < text.length
  const isLast = msg && msg.page >= msg.pages.length - 1

  return (
    <div className="narrator">
      {msg && (
        <div className="bubble" role="status" aria-live="polite">
          <div className="bubble__head">
            <span>El Narrador</span>
            <button className="bubble__close" onClick={dismiss} aria-label="Cerrar globo del narrador">
              ×
            </button>
          </div>
          <p
            className="bubble__text"
            onClick={() => typing && setShown(text.length)}
            title={typing ? 'Clic para mostrar todo' : undefined}
          >
            <span aria-hidden>{text.slice(0, shown)}</span>
            <span className="sr-only">{text}</span>
            {typing && <span className="bubble__caret" aria-hidden />}
          </p>
          <div className="bubble__actions">
            {typing ? (
              <button className="w-btn" onClick={() => setShown(text.length)}>
                Saltar
              </button>
            ) : isLast && msg.choices ? (
              msg.choices.map((c) => (
                <button key={c.label} className="w-btn" onClick={() => choose(c)}>
                  {c.label}
                </button>
              ))
            ) : (
              <button className="w-btn" onClick={advance} autoFocus>
                {isLast ? 'Aceptar' : 'Siguiente ▸'}
              </button>
            )}
          </div>
        </div>
      )}
      <button
        className="narrator__char"
        onClick={onCharacterClick}
        aria-label="Pedirle una pista al narrador"
        title="¿Necesita ayuda, Stanley?"
      >
        <MicCharacter talking={typing} />
      </button>
    </div>
  )
}
