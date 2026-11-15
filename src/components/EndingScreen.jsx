import { useState } from 'react'
import CreditsContent from './CreditsContent'
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, STEAM_URL } from '../links'
import './EndingScreen.css'

const ENDINGS = {
  door: {
    title: 'Ahora puede apagar el equipo con seguridad.',
    text: [
      'Stanley se levantó, caminó hacia una puerta que nadie le había señalado, y salió.',
      'El narrador no sabe adónde fue. Por primera vez, eso le parece bien.',
    ],
    tag: 'Final: la puerta',
  },
  chair: {
    title: 'Stanley volvió a su silla.',
    text: [
      'La oficina siguió vacía. La pantalla, en silencio. Las 24:00, inmóviles.',
      'Mañana a las 9:00 alguien le dirá qué hacer. Quizás. Mientras tanto, Stanley espera. Es lo que mejor sabe hacer.',
    ],
    tag: 'Final: la silla',
  },
  quit: {
    title: 'Wingows se está cerrando…',
    text: [
      'Stanley apagó la computadora sin abrir el expediente. Nadie le dijo que no lo hiciera. Nadie le dijo nada.',
      'La pregunta, sin embargo, sigue encendida. Las preguntas no se apagan con un botón.',
    ],
    tag: 'Final: sin respuestas',
  },
}

export default function EndingScreen({ kind, onRestart }) {
  const [credits, setCredits] = useState(false)
  const e = ENDINGS[kind] ?? ENDINGS.door

  return (
    <div className="ending" role="dialog" aria-label={e.tag}>
      {credits ? (
        <div className="ending__credits">
          <CreditsContent />
          <button className="w-btn" onClick={() => setCredits(false)}>
            ◂ Volver
          </button>
        </div>
      ) : (
        <div className="ending__inner">
          <p className="ending__tag">{e.tag}</p>
          <h1 className="ending__title">{e.title}</h1>
          {e.text.map((t) => (
            <p key={t} className="ending__text">
              {t}
            </p>
          ))}
          <div className="ending__insta">
            <p>
              El expediente se cerró, pero la oficina sigue abierta. Seguí la historia, descubrí nuevas pistas y
              contanos qué hizo tu Stanley en Instagram.
            </p>
            <a className="ending__insta-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Seguir a {INSTAGRAM_HANDLE} ↗
            </a>
          </div>
          <div className="ending__actions">
            <a className="w-btn" href={STEAM_URL} target="_blank" rel="noreferrer">
              Conocer The Stanley Parable ↗
            </a>
            <button className="w-btn" onClick={() => setCredits(true)}>
              Créditos
            </button>
            <button className="w-btn" onClick={onRestart}>
              Volver a empezar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
