import { useEffect, useState } from 'react'
import wingowsLogo from '../assets/desktop/wingows-logo.svg'
import photo427 from '../assets/staff/empleado427.jpg'
import './BootScreen.css'

const QUOTE =
  'Cansado de buscar por toda la oficina el porqué de que no hubiera nadie en el lugar, y sin llegar a nada, Stanley decidió buscar una respuesta en su computadora de trabajo.'

export default function BootScreen({ onDone }) {
  const [step, setStep] = useState('boot') // boot → quote → login
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    if (step !== 'boot') return
    const t = setTimeout(() => setStep('quote'), 3000)
    return () => clearTimeout(t)
  }, [step])

  useEffect(() => {
    if (step !== 'quote') return
    const id = setInterval(() => {
      setTyped((t) => {
        if (t >= QUOTE.length) clearInterval(id)
        return Math.min(t + 1, QUOTE.length)
      })
    }, 34)
    return () => clearInterval(id)
  }, [step])

  const fullscreen = () => {
    const el = document.documentElement
    if (!document.fullscreenElement) el.requestFullscreen?.().catch(() => {})
    else document.exitFullscreen?.()
  }

  if (step === 'boot') {
    return (
      <div className="boot" onClick={() => setStep('quote')}>
        <img className="boot__logo" src={wingowsLogo} alt="" />
        <h1 className="boot__brand">
          Wingows<sup>®</sup>
        </h1>
        <p className="boot__edition">Edición Oficina 2002</p>
        <div className="boot__bar" aria-label="Cargando">
          <span />
          <span />
          <span />
        </div>
        <button className="boot__skip" onClick={() => setStep('quote')}>
          Saltar
        </button>
      </div>
    )
  }

  if (step === 'quote') {
    const done = typed >= QUOTE.length
    return (
      <div className="boot boot--quote" onClick={() => (done ? setStep('login') : setTyped(QUOTE.length))}>
        <p className="boot__quote">
          <span aria-hidden>{QUOTE.slice(0, typed)}</span>
          <span className="sr-only">{QUOTE}</span>
        </p>
        <button className={`w-btn boot__next ${done ? 'is-visible' : ''}`} onClick={() => setStep('login')}>
          Continuar ▸
        </button>
      </div>
    )
  }

  return (
    <div className="login">
      <div className="login__top" />
      <div className="login__body">
        <div className="login__left">
          <img src={wingowsLogo} alt="" className="login__logo" />
          <h1>Wingows</h1>
          <p>Para comenzar, haga clic en su nombre de usuario.</p>
          <p className="login__about">
            <strong>Expediente 427</strong> es una expansión interactiva de <em>The Stanley Parable</em>, un videojuego
            sobre un oficinista, un narrador y las decisiones. No hace falta haberlo jugado: esta historia empieza
            cuando la oficina ya quedó vacía.
          </p>
        </div>
        <div className="login__divider" />
        <div className="login__right">
          <button className="login__user" onClick={onDone} autoFocus>
            <img src={photo427} alt="" />
            <span>
              <strong>Empleado 427</strong>
              <small>La contraseña no cambió. Nadie la cambió nunca.</small>
            </span>
          </button>
        </div>
      </div>
      <div className="login__bottom">
        <span>Recomendado: pantalla completa y con sonido.</span>
        <button className="w-btn" onClick={fullscreen}>
          Pantalla completa
        </button>
      </div>
    </div>
  )
}
