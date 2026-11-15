import { useEffect, useRef, useState } from 'react'
import playPause from '../assets/desktop/play-pause.svg'
import barTrack from '../assets/desktop/player-bar.svg'
import './WingampPlayer.css'

const TRACK_ID = '4HdwXFgiUfV2UQ0E9DQac7'
const TRACK_URI = `spotify:track:${TRACK_ID}`
const EMBED_URL = `https://open.spotify.com/embed/track/${TRACK_ID}?utm_source=generator&theme=0`
const API_SRC = 'https://open.spotify.com/embed/iframe-api/v1'

/** Carga una sola vez la API de iFrame de Spotify y resuelve con el objeto IFrameAPI. */
let apiPromise
function loadSpotifyApi() {
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve, reject) => {
    window.onSpotifyIframeApiReady = (api) => resolve(api)
    const s = document.createElement('script')
    s.src = API_SRC
    s.async = true
    s.onerror = reject
    document.body.appendChild(s)
  })
  return apiPromise
}

const fmt = (ms) => {
  const t = Math.max(0, Math.floor((ms || 0) / 1000))
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
}

/**
 * Reproductor con skin al estilo Winamp de los 2000, en la posición y el tamaño
 * del "Reproductor" del diseño (296 × 261 en 1108, 259). El audio lo reproduce
 * el iframe oficial de Spotify; los controles propios usan su iFrame API.
 */
export default function WingampPlayer({ onFirstPlay }) {
  const hostRef = useRef(null)
  const ctrlRef = useRef(null)
  const firstPlay = useRef(false)
  const onFirstPlayRef = useRef(onFirstPlay)
  useEffect(() => {
    onFirstPlayRef.current = onFirstPlay
  }, [onFirstPlay])
  const [ready, setReady] = useState(false)
  const [fallback, setFallback] = useState(false)
  const [state, setState] = useState({ paused: true, position: 0, duration: 0 })
  const [title, setTitle] = useState('Cargando pista…')

  // Título de la pista vía oEmbed (público, con CORS habilitado)
  useEffect(() => {
    let alive = true
    fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${TRACK_ID}`)
      .then((r) => r.json())
      .then((d) => alive && setTitle(d.title || 'Pista 01'))
      .catch(() => alive && setTitle('Pista 01'))
    return () => {
      alive = false
    }
  }, [])

  // Controlador de Spotify
  useEffect(() => {
    let cancelled = false
    const wrapper = hostRef.current
    const host = document.createElement('div')
    wrapper.appendChild(host)
    const timeout = setTimeout(() => !ctrlRef.current && !cancelled && setFallback(true), 10000)

    loadSpotifyApi()
      .then((api) => {
        if (cancelled) return
        api.createController(host, { uri: TRACK_URI, width: '100%', height: 80 }, (ctrl) => {
          if (cancelled) {
            ctrl.destroy()
            return
          }
          ctrlRef.current = ctrl
          ctrl.addListener('ready', () => setReady(true))
          ctrl.addListener('playback_update', (e) => {
            const { isPaused, position, duration } = e.data
            setState({ paused: isPaused, position, duration })
            if (!isPaused && !firstPlay.current) {
              firstPlay.current = true
              onFirstPlayRef.current?.()
            }
          })
        })
      })
      .catch(() => !cancelled && setFallback(true))

    return () => {
      cancelled = true
      clearTimeout(timeout)
      ctrlRef.current?.destroy?.()
      ctrlRef.current = null
      wrapper.innerHTML = ''
    }
  }, [])

  const toggle = () => ctrlRef.current?.togglePlay()
  const seek = (e) => {
    const ctrl = ctrlRef.current
    if (!ctrl || !state.duration) return
    const r = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1)
    ctrl.seek((ratio * state.duration) / 1000)
  }
  const onSeekKey = (e) => {
    const ctrl = ctrlRef.current
    if (!ctrl || !state.duration) return
    const step = e.key === 'ArrowRight' ? 5 : e.key === 'ArrowLeft' ? -5 : 0
    if (step) ctrl.seek(Math.max(0, state.position / 1000 + step))
  }

  const pct = state.duration ? (state.position / state.duration) * 100 : 0
  const playing = !state.paused

  return (
    <section className="wingamp" aria-label="Reproductor Wingamp">
      <header className="wingamp__bar">
        <span className="wingamp__logo">WINGAMP</span>
        <span className="wingamp__dots" aria-hidden>
          <i /> <i /> <i />
        </span>
      </header>

      <div className="wingamp__screen">
        <div className="lcd">
          <div className="lcd__row">
            <span className="lcd__state" aria-hidden>{playing ? '▶' : '❚❚'}</span>
            <span className="lcd__time">{fmt(state.position)}</span>
            <span className="lcd__meta">
              128 kbps
              <br />
              44 kHz · estéreo
            </span>
          </div>
          <div className="lcd__marquee" aria-label={`Pista: ${title}`}>
            <span className={playing ? 'is-moving' : ''}>
              1. {title} ({fmt(state.duration)}) *** 1. {title} ({fmt(state.duration)}) ***&nbsp;
            </span>
          </div>
          <div className={`lcd__eq ${playing ? 'is-playing' : ''}`} aria-hidden>
            {Array.from({ length: 19 }, (_, i) => (
              <i key={i} style={{ animationDelay: `${(i * 137) % 600}ms`, animationDuration: `${420 + ((i * 89) % 380)}ms` }} />
            ))}
          </div>
        </div>
        <div className="wingamp__embed" ref={hostRef} />
        {fallback && (
          <iframe
            className="wingamp__embed wingamp__embed--fallback"
            title="Spotify"
            src={EMBED_URL}
            width="100%"
            height="80"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        )}
      </div>

      <button
        className="wingamp__play"
        onClick={toggle}
        disabled={!ready}
        aria-label={playing ? 'Pausar' : 'Reproducir'}
        aria-pressed={playing}
        title={ready ? (playing ? 'Pausar' : 'Reproducir') : 'Usá el reproductor de Spotify de abajo'}
      >
        <img src={playPause} alt="" width="26" height="26" />
      </button>
      <div
        className="wingamp__seek"
        role="slider"
        tabIndex={0}
        aria-label="Posición de la pista"
        aria-valuemin={0}
        aria-valuemax={Math.round(state.duration / 1000)}
        aria-valuenow={Math.round(state.position / 1000)}
        onClick={seek}
        onKeyDown={onSeekKey}
      >
        <img className="wingamp__track" src={barTrack} alt="" width="196" height="6" />
        <span className="wingamp__fill" style={{ width: `${pct}%` }} />
        <span className="wingamp__knob" style={{ left: `${pct}%` }} />
      </div>
    </section>
  )
}
